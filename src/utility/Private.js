import {useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import { useAuth } from "../context/authProvider";
import {onAuthStateChanged} from 'firebase/auth';
import ScaleLoading from './ScaleLoading';

function Private({ children }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState('unknown')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) navigate('../');
      setLoggedIn(user);
    });
    return unsub;
  }, [auth, navigate]);

  return loggedIn === 'unknown' ? <ScaleLoading /> : children;
}

export default Private;
