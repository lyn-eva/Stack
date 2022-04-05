import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackSection from "./StackSection";

function Stack() {
  const [repoDetail, setRepoDetail] = useState({});
  const location = useLocation();
  const { user } = useAuth();
  const { stacks } = useDB();

  const stackId = location.pathname.slice(1);
  const repoName = stacks[stackId]?.name;

  useEffect(() => {
    if (!user) return;
    const username = user.reloadUserInfo.screenName;
    (async () => {//IIFE
      const raw = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const details = await raw.json();
      setRepoDetail({
        createdAt: Date(details.created_at),
        updatedAt: Date(details.updated_at),
        pushedAt: Date(details.pushed_at),
      });
    })();
  }, [user]);
  
  const createdAt = Date(stacks[stackId]?.created.seconds);
  const updatedAt = Date(stacks[stackId]?.modified.seconds);

  return (
    <main className="flex justify-between mb-8">
      <section className="w-[22rem]">
        <RepoFrame name={repoName} />
        <MetaData
          createdAt={repoDetail.createdAt}
          updatedAt={repoDetail.updatedAt}
          pushedAt={repoDetail.pushedAt}
          hdr="Repo Details"
        />
        <MetaData
          createdAt={createdAt}
          updatedAt={updatedAt}
          hdr="Stack Details"
        />
      </section>
      <StackSection />
    </main>
  );
}

export default Stack;
