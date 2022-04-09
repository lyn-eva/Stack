import { createContext, useContext, useState, useEffect } from "react";
import app from "../firebaseConfig";
import { useAuth } from "./authProvider";
import {
  getFirestore,
  serverTimestamp,
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  setDoc,
  getDoc,
  addDoc,
  updateDoc
} from "firebase/firestore";
const dbCtx = createContext({});
export const useDB = () => useContext(dbCtx);

const metadata = () => ({ created: serverTimestamp(), modified: serverTimestamp() });
const db = getFirestore(app);

function DbProvider({ children }) {
  const { getUser, user } = useAuth();
  const [stacks, setStacks] = useState([]);
  const [ideaList, setIdeaList] = useState({});

  useEffect(() => {
    if (!user) return;
    const unsub = listenToStacksChange();
    return unsub;
  }, [user]);

  useEffect(() => {
    if (Object.keys(stacks).length === 0) return;
    const listeners = listenToIdeasChange();
    return () => {
      listeners.forEach((cleanUp) => {
        cleanUp();
      });
    };
  }, [stacks]);

  const listenToStacksChange = () => {
    const q = query(
      collection(db, "users", user.reloadUserInfo.screenName, "stacks"),
      orderBy("created")
    );
    return onSnapshot(q, (snapshot) => {
      const stackData = snapshot.docs.reduce(
        (total, doc) => (total = { ...total, [doc.id]: { id: doc.id, ...doc.data() } }),
        {}
      );
      setStacks(stackData);
    });
  };

  const listenToIdeasChange = () => {
    let listeners = [];
    Object.keys(stacks).forEach((stackId) => {
      const q = query(
        collection( db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas"),
        orderBy("created")
        );
        const unsub = onSnapshot(q, (snapshot) => {
          const ideas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setIdeaList((prev) => ({ ...prev, [stackId]: ideas }));
        });
        listeners.push(unsub);
      });
      return listeners;
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
    
    const createStack = async (repo, url) => {
      const user = getUser(); //
      const path = "users/" + user.reloadUserInfo.screenName + "/stacks";
      return addDoc(collection(db, path), { name: repo, url: url, ...metadata() });
    };
    
    const createIdea = ( stackId, new_data) => {
      const path = collection( db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas");
      return addDoc(path, {...new_data, ...metadata()}); 
    }
    
    const updateIdea = async ( stackId, id, new_data) => {
      const path = doc( db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas", id);
      return updateDoc(path, new_data);
    }
    
    
    const value = { stacks, ideaList, createUser, createStack, createIdea, updateIdea };
    return <dbCtx.Provider value={value}>{children}</dbCtx.Provider>;
  }
  
  export default DbProvider;
