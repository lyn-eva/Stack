import { useEffect, useState } from 'react';
import { useDB } from '../context/dbProvider';

function useGithub() {
  const [profileData, setProfileData] = useState({});
  const { userInfo } = useDB();

  useEffect(() => {
    if (!userInfo?.username) return;
    (async () => {
      const raw = await fetch(`https://api.github.com/users/${userInfo?.username}`);
      const data = await raw.json();
      setProfileData(data);
    })();
  }, [userInfo]);

  return profileData;
}

export default useGithub;
