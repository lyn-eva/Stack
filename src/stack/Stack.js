import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackSection from "./StackSection";

function Stack() {
  const [repoDetail, setRepoDetail] = useState({});
  const location = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    const username = user.reloadUserInfo.screenName;
    (async () => { //IIFE
      const raw = await fetch(`https://api.github.com/repos/${username}/${location.pathname.slice(1)}`);
      const details = await raw.json();
      setRepoDetail({createdAt: details.created_at, updatedAt: details.updated_at, pushedAt: details.pushed_at});
    })() 
  }, [user]);

  return (
    <main className='flex justify-between'>
      <section className='w-[21rem]'>
        <RepoFrame name={location.pathname.slice(1)}/>
        <MetaData detail={repoDetail} hdr='Repo Details' />
        <MetaData hdr='Stack Details'/>
      </section>
      <StackSection />
    </main>
  );
}

export default Stack;
