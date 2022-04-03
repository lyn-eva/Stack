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

const provider = new GithubAuthProvider();
console.log(provider);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    if (!user) return;
    fetch(`https://api.github.com/users/${user.reloadUserInfo.screenName}/repos`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [user]);
  console.log(user)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      setUser(res);
    });

    return unsub();
  }, []);

  const PopupSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    // console.log(result)
    return credential; // fix
  };

  const SignOut = () => {
    return signOut(auth);
  };

  const value = { PopupSignIn, SignOut };

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
}

export default AuthProvider;
