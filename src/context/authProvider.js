import { useEffect, useState, useContext, createContext } from "react";
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, updateDoc, doc } from "@firebase/firestore";
import app from "../firebaseConfig";

const authCtx = createContext({});
export const useAuth = () => useContext(authCtx);

const getUser = () => getAuth().currentUser;
const provider = new GithubAuthProvider();
// provider.addScope('user');
provider.addScope('repo');
const auth = getAuth(app);
const db = getFirestore(app);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      setUser(res);
      console.log("listen");
    });
    return unsub();
  }, []);
  
  const PopupSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    return updateDoc(doc(db, 'users', result.user.reloadUserInfo.screenName), {token: credential.accessToken}) // update github access token
  };

  const SignOut = () => {
    return signOut(auth);
  };

  const value = { PopupSignIn, SignOut, auth, getUser, user, db };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}

export default AuthProvider;
