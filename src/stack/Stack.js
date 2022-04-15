import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackIdea from "./StackIdeas";

function Stack() {
  const [repoDetail, setRepoDetail] = useState({});
  const [stack, setStack] = useState(null)
  const location = useLocation();
  const { listenToStack } = useDB();
  const { user } = useAuth();
  const stackId = location.pathname.slice(1);

  useEffect(() => {
    if (!user) return;
    const unsub = listenToStack(stackId, setStack);
    return unsub;
  }, [user]);

  const repoName = stack?.name;

  useEffect(() => {
    if (!user || !repoName) return;
    const username = user.reloadUserInfo.screenName;
    (async () => {
      const raw = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const details = await raw.json();
      setRepoDetail({
        createdAt: new Date(details.created_at).getTime(),
        updatedAt: new Date(details.updated_at).getTime(),
        pushedAt: new Date(details.pushed_at).getTime(),
        repoUrl: details.html_url,
      });
    })(); //IIFE
  }, [user, repoName]);

  return (
    <main className="flex justify-between mb-8 mt-16">
      <section className="w-[21.5rem]">
        <RepoFrame name={repoName} />
        <MetaData
          createdAt={repoDetail.createdAt}
          updatedAt={repoDetail.updatedAt}
          pushedAt={repoDetail.pushedAt}
          hdr="Repo Details"
        />
        <MetaData createdAt={stack?.created.toMillis()} updatedAt={stack?.modified.toMillis()} hdr="Stack Details" />
      </section>
      <StackIdea stackId={stackId} repoUrl={repoDetail.repoUrl}/>
    </main>
  );
}

export default Stack;
