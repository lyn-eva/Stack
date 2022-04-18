import { RepoCard } from "./RepoCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import MetaData from "./MetaData";
import StackIdea from "./StackIdeas";

function Stack() {
  const [repoDetail, setRepoDetail] = useState({});
  const [stack, setStack] = useState(null);

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
    <main className="mb-8 mt-10 justify-between sm:mt-16 lg:mt-[5vw] lg:flex lg:gap-6">
      <section className="sm:flex sm:gap-6 lg:block lg:max-w-[21.5rem]">
        <RepoCard repoName={repoName} />
        <div className="mt-3 sm:mt-0 sm:w-1/2 lg:mt-6 lg:w-full">
          <MetaData
            createdAt={repoDetail.createdAt}
            updatedAt={repoDetail.updatedAt}
            pushedAt={repoDetail.pushedAt}
            hdr="Repo Details"
          />
          <MetaData
            createdAt={stack?.created?.toMillis()}
            updatedAt={stack?.modified?.toMillis()}
            hdr="Stack Details"
          />
        </div>
      </section>
      <StackIdea stackId={stackId} repoUrl={repoDetail.repoUrl} />
    </main>
  );
}

export default Stack;
