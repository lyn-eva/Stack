import { useContext, createContext } from "react";
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebaseConfig";

const authCtx = createContext({});
export const useAuth = () => useContext(authCtx);
console.log("rendered");

const provider = new GithubAuthProvider();
console.log(provider);

function AuthProvider({ children }) {
  const auth = getAuth(app);

  const PopupSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    return credential; // fix
  };

  const SignOut = () => {
    return signOut(auth);
  }

  const value = { PopupSignIn, SignOut };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}

export default AuthProvider;
