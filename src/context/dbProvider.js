import { createContext, useContext } from "react";
import app from "../firebaseConfig";
import { useAuth } from "./authProvider";
import { getFirestore, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
const dbCtx = createContext({});
export const useDB = () => useContext(dbCtx);

const metadata = () => ({ created: serverTimestamp(), modified: serverTimestamp() });
const db = getFirestore(app);

function DbProvider({ children }) {
  const { getUser } = useAuth();

  const createUser = async () => {
    const user = getUser();
    const path = "users/" + user.reloadUserInfo.screenName;
    const alreadyExist = await getDoc(doc(db, path));
    if (alreadyExist.exists()) return;
    return setDoc(doc(db, path), {
      displayName: user.displayName,
      ...metadata(),
    });
  };

  // const createStack =

  const value = { createUser };
  return <dbCtx.Provider value={value}>{children}</dbCtx.Provider>;
}

export default DbProvider;
