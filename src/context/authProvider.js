import { useEffect, useState, useContext, createContext } from "react";
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  deleteUser
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import app from "../firebaseConfig";

const authCtx = createContext({});
export const useAuth = () => useContext(authCtx);

const getUser = () => getAuth().currentUser;
const provider = new GithubAuthProvider();
// provider.addScope('user');
provider.addScope("repo");
const auth = getAuth(app);
const db = getFirestore(app);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => setUser(res));
    return unsub;
  }, []);

  const PopupSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    return {token: credential.accessToken, userdata: result.user};
  };
  const SignOut = () => {
    return signOut(auth);
  };

  const DeleteUserAcc = async () => {
    await deleteUser(user);
  }

  const value = { PopupSignIn, SignOut, auth, getUser, DeleteUserAcc, user, db };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}

export default AuthProvider;
