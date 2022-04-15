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

const getUser = () => getAuth().currentUser;
const provider = new GithubAuthProvider();
const auth = getAuth(app);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      setUser(res);
    });

    return unsub();
  }, []);

  const PopupSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    console.log(credential);
    setToken(credential.accessToken);
    return credential; // fix
  };

  const SignOut = () => {
    return signOut(auth);
  };

  const value = { PopupSignIn, SignOut, auth, getUser, user, token };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}

export default AuthProvider;
