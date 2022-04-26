import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authProvider";
import {
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
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
const dbCtx = createContext({});
export const useDB = () => useContext(dbCtx);


const DEFAULT_FILTER ={ key: 'checked', value: false}
const metadata = () => ({ created: serverTimestamp(), modified: serverTimestamp() });

function DbProvider({ children }) {
  const { user, db } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'users', user.uid), snapshot => {
      setUserInfo(snapshot.data())
    });
  
    return unsub
  }, [user, db]);

  const listenToStacks = (setStacks) => {
    const q = query(collection(db, "users", user.uid, "stacks"), orderBy("created"));
    return onSnapshot(q, snapshot => {
      const ideas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStacks(ideas);
    })
  };
  
  const listenToStack = (stackId, setStack) => {
    const q = doc(db, "users", user.uid, "stacks", stackId);
    return onSnapshot(q, (snapshot) => {
      const stack = { id: snapshot.id, ...snapshot.data() };
      setStack(stack);
    });
  };

  const listenToIdeas = (stackId, setIdeas, sortBy = 'created', filterBy = DEFAULT_FILTER) => {
    const path = query(
      collection(db, "users", user.uid, "stacks", stackId, "ideas"),
      where(filterBy.key, "==", filterBy.value),
      orderBy(sortBy, "desc")
    );

    return onSnapshot(path, (snapshot) => {
      const ideas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIdeas(ideas);
    });
  };
  
  const getStacks = () => {
    return getDocs(collection(db, 'users', user.uid, 'stacks'));
  }

  const createUser = async ({ token, userdata }) => {
    const path = doc(db, 'users', userdata.uid);
    const data = {
      token: token,
      name: userdata.displayName,
      username: userdata.reloadUserInfo.screenName,
      photoURL: userdata.photoURL,
    };
    if (await userExists(userdata.uid)) {
      console.log('exists')
      return updateUserInfo(userdata.uid, data);
    }
    const create_user = setDoc(path, { ...data, ...metadata(), stackCount: 0, ideaCounts: 0 });
    return await Promise.all([create_user, updateUserList('ADD', userdata.uid)]);
  };
  
  const userExists = async (uid) => {
    const users = await getDoc(doc(db, 'metadata', 'existing_users'));
    return users.data().user_ids.includes(uid);
  };
  
  const updateUserList = async (type, uid) => {
    return updateDoc(doc(db, 'metadata', 'existing_users'), {
      user_ids: type === 'ADD' ? arrayUnion(uid) : arrayRemove(uid),
    });
  };
  
  const updateUserInfo = async (uid, userData) => {
    return updateDoc(doc(db, 'users', uid), {...userData, modified: serverTimestamp()});
  }

  const createStack = async (repo, url) => {
    const path = collection(db, 'users', user.uid, 'stacks');
    return await Promise.all([
      updateUserInfo(user.uid, { ...metadata(), stackCount: increment(1) }),
      addDoc(path, { name: repo, url: url, ...metadata() }),
    ]);
  };
  
  const updateStack = async (stackId, new_data) => {
    const path = doc(db, 'users', user.uid, 'stacks', stackId);
    return await Promise.all([
      updateUserInfo(user.uid, { modified: serverTimestamp() }),
      updateDoc(path, new_data),
    ]);
  };
  
  const createIdea = async (stackId, new_data) => {
    const path = collection(db, 'users', user.uid, 'stacks', stackId, 'ideas');
    return await Promise.all([
      updateUserInfo(user.uid, { modified: serverTimestamp(), ideaCount: increment(1) }),
      updateStack(stackId, { modified: serverTimestamp() }),
      addDoc(path, { ...new_data, ...metadata() }),
    ]);
  };
  
  const updateIdea = async (stackId, id, new_data) => {
    const path = doc(db, 'users', user.uid, 'stacks', stackId, 'ideas', id);
    return await Promise.all([
      updateStack(stackId, { modified: serverTimestamp() }),
      updateDoc(path, { ...new_data, modified: serverTimestamp() }),
    ]);
  };
  
  const deleteIdea = async (stackId, id) => {
    const path = doc(db, 'users', user.uid, 'stacks', stackId, 'ideas', id);
    return await Promise.all([
      updateUserInfo(user.uid, { ...metadata(), ideaCount: increment(-1) }),
      updateStack(stackId, { modified: serverTimestamp() }),
      deleteDoc(path),
    ]);
  }
  
  const deleteStack = async (stackId, rootBatch) => {
    const batch = rootBatch ?? writeBatch(db);
    const ideas = await getDocs(collection(db, 'users', user.uid, 'stacks', stackId, 'ideas'));
    ideas.forEach((idea) => batch.delete(doc(db, 'users', user.uid, 'stacks', stackId, 'ideas', idea.id))); //delete nested ideas
    batch.delete(doc(db, 'users', user.uid, 'stacks', stackId)); // delete stack root path
    await updateUserInfo(user.uid, { ...metadata(), stackCount: increment(-1), ideaCount: increment(-ideas.docs.length) });
    return rootBatch ? null : batch.commit();
  };

  const deleteUserDb = async () => {
    const batch = writeBatch(db);
    const stacks = await getDocs(collection(db, "users", user.uid, "stacks"));
    await Promise.all(stacks.docs.map(stack => deleteStack(stack.id, batch))) // delete nested stacks
    batch.delete(doc(db, "users", user.uid)); // delete user root path
    await updateUserList('REMOVE', user.uid);
    return batch.commit();
  }

  const value = { createUser, userInfo, createStack, createIdea, updateIdea, deleteIdea, listenToStacks, listenToIdeas, listenToStack, deleteStack, deleteUserDb, getStacks };
  return <dbCtx.Provider value={value}>{children}</dbCtx.Provider>;
}

export default DbProvider;
