import { createContext, useContext, useState, useEffect } from "react";
import app from "../firebaseConfig";
import { useAuth } from "./authProvider";
import { getFirestore, serverTimestamp, onSnapshot, doc, collection, query, orderBy, setDoc, getDoc, addDoc } from "firebase/firestore";
const dbCtx = createContext({});
export const useDB = () => useContext(dbCtx);

const metadata = () => ({ created: serverTimestamp(), modified: serverTimestamp() });
const db = getFirestore(app);

function DbProvider({ children }) {
  const { getUser, user } = useAuth();
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsub = listenToStacksChange();
    return unsub;
  }, [user]);
  
  const listenToStacksChange = () => {
    const q = query(
      collection(db, "users", user.reloadUserInfo.screenName, "stacks"),
      orderBy("created")
    );
    return onSnapshot(q, (snapshot) => {
      setStacks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  const createUser = async () => {
    const user = getUser(); //
    const path = "users/" + user.reloadUserInfo.screenName;
    const alreadyExist = await getDoc(doc(db, path));
    if (alreadyExist.exists()) return;
    return setDoc(doc(db, path), {
      username: user.displayName,
      ...metadata(),
    });
  };
  
  const createStack = async (repo) => {
    const user = getUser(); //
    const path = "users/" + user.reloadUserInfo.screenName + '/stacks';
    return addDoc(collection(db, path), { name: repo, ...metadata() });
  }

  const value = { stacks, createUser, createStack };
  return <dbCtx.Provider value={value}>{children}</dbCtx.Provider>;
}

export default DbProvider;
