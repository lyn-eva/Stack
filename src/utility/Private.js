import { useEffect } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "@firebase/auth";
import { useAuth } from "../context/authProvider";

function Private({ children }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      if (res == null) navigate("../");
    });
    return unsub;
  }, []);

  return children;
}

export default Private;
