import { useEffect, useState, useContext, createContext } from "react";
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebaseConfig";

const authCtx = createContext({});
export const useAuth = () => useContext(authCtx);
console.log("rendered");
const getUser = () => getAuth().currentUser;
const provider = new GithubAuthProvider();
// console.log(provider);

const auth = getAuth(app);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      setUser(res);
    });

    return unsub();
  }, []);

  const PopupSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    return credential; // fix
  };

  const SignOut = () => {
    return signOut(auth);
  };

  const value = { PopupSignIn, SignOut, getUser, user };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}

export default AuthProvider;
