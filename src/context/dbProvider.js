import { createContext, useContext } from "react";
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
  where,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch
} from "firebase/firestore";
const dbCtx = createContext({});
export const useDB = () => useContext(dbCtx);

const metadata = () => ({ created: serverTimestamp(), modified: serverTimestamp() });
const db = getFirestore(app);

function DbProvider({ children }) {
  const { getUser, user, token } = useAuth();

  const listenToStacks = (setStacks) => {
    const q = query(collection(db, "users", user.reloadUserInfo.screenName, "stacks"), orderBy("created"));
    return onSnapshot(q, snapshot => {
      const ideas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStacks(ideas);
    })
  };
  
  const listenToStack = (stackId, setStack) => {
    const q = doc(db, "users", user.reloadUserInfo.screenName, "stacks", stackId);
    return onSnapshot(q, (snapshot) => {
      const stack = { id: snapshot.id, ...snapshot.data() };
      setStack(stack);
    });
  };

  const listenToIdeas = (stackId, setIdeas, order = 'created', filter = -1) => {
    const q = query(collection(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas"), orderBy(order, 'desc'));
    const q_filter = query(collection(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas"), where('level', '==', filter));
    return onSnapshot((filter >= 0 ? q_filter : q), snapshot => {
      const ideas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIdeas(ideas);
    })
  };

  const getStacks = () => {
    return getDocs(collection(db, 'users', user.reloadUserInfo.screenName, 'stacks'));
  }

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
    const path = collection(db, "users", user.reloadUserInfo.screenName, "stacks");
    return addDoc(path, { name: repo, url: url, ...metadata() });
  };

  const updateStack = (stackId, new_data) => {
    const path = doc(db, "users", user.reloadUserInfo.screenName, "stacks", stackId);
    return updateDoc(path, new_data);
  };
  
  const createIdea = (stackId, new_data) => {
    const path = collection(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas");
    return addDoc(path, { ...new_data, ...metadata() });
  };
  
  const updateIdea = async (stackId, id, new_data) => {
    const path = doc(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas", id);
    const updated_idea = updateDoc(path, { ...new_data, modified: serverTimestamp() });
    await updateStack(stackId, { modified: serverTimestamp() })
    return updated_idea;
  };
  
  const deleteIdea = async (stackId, id) => {
    const path = doc(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas", id);
    await updateStack(stackId, { modified: serverTimestamp() })
    return deleteDoc(path);
  }
  
  const deleteStack = async (stackId, rootBatch) => {
    const batch = rootBatch ?? writeBatch(db);
    const ideas = await getDocs(collection(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas"));
    ideas.forEach(idea => batch.delete(doc(db, "users", user.reloadUserInfo.screenName, "stacks", stackId, "ideas", idea.id))); //delete nested ideas
    batch.delete(doc(db, "users", user.reloadUserInfo.screenName, "stacks", stackId)) // delete stack root path
    await updateStack(stackId, { modified: serverTimestamp() })
    return rootBatch ? null : batch.commit();
  }
  
  const deleteUser = async () => {
    const batch = writeBatch(db);
    const stacks = await getDocs(collection(db, "users" + user.reloadUserInfo.screenName + "stacks"));
    await Promise.all(stacks.map(stack => deleteStack(stack.id, batch))) // delete nested stacks
    batch.delete(doc(db, "users", user.reloadUserInfo.screenName)); // delete user root path
    return batch.commit();
  }

  const value = { createUser, createStack, createIdea, updateIdea, deleteIdea, listenToStacks, listenToIdeas, listenToStack, deleteStack, deleteUser, getStacks };
  return <dbCtx.Provider value={value}>{children}</dbCtx.Provider>;
}

export default DbProvider;
