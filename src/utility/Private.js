import { useNavigate } from "react-router";
import { useAuth } from "../context/authProvider";

function Private({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return user === null ? navigate(-1): children;
}

export default Private;
