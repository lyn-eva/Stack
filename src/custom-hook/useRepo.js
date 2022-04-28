import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";

function useRepo(repoName) {
  const [details, setDetails] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !repoName) return;
    const username = user.reloadUserInfo.screenName;
    (async () => {
      const raw = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const details = await raw.json();
      setDetails({
        createdAt: new Date(details.created_at).getTime(),
        updatedAt: new Date(details.updated_at).getTime(),
        pushedAt: new Date(details.pushed_at).getTime()
      });
    })(); //IIFE
  }, [user, repoName]);

  return details;
}

export default useRepo;
