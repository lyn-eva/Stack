import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackIdea from "./StackIdeas";

const parseDate = (string) => new Date(Date.parse(string)).toString();

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
  const createdAt = stack?.created.toDate().toString();
  const updatedAt = stack?.modified.toDate().toString();

  useEffect(() => {
    if (!user || !repoName) return;
    const username = user.reloadUserInfo.screenName;
    (async () => {
      const raw = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const details = await raw.json();
      setRepoDetail({
        createdAt: parseDate(details.created_at),
        updatedAt: parseDate(details.updated_at),
        pushedAt: parseDate(details.pushed_at),
        repoUrl: details.url,
      });
    })(); //IIFE
  }, [user, repoName]);

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
        <MetaData createdAt={createdAt} updatedAt={updatedAt} hdr="Stack Details" />
      </section>
      <StackIdea stackId={stackId} repoUrl={repoDetail.repoUrl}/>
    </main>
  );
}

export default Stack;
