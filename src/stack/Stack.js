import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import Idea from "../idea/Idea";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackSection from "./StackSection";

const parseDate = (string) => new Date(Date.parse(string)).toString();

function Stack() {
  const [repoDetail, setRepoDetail] = useState({});
  const location = useLocation();
  const { user } = useAuth();
  const { stacks } = useDB();

  const stackId = location.pathname.slice(1);
  const repoName = stacks[stackId]?.name;
  const createdAt = stacks[stackId]?.created.toDate().toString();
  const updatedAt = stacks[stackId]?.modified.toDate().toString();

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
      });
    })(); //IIFE
  }, [user, repoName]);

  return (
    <main className="flex justify-center mb-8">
      {/* <section className="w-[22rem]">
        <RepoFrame name={repoName} />
        <MetaData
          createdAt={repoDetail.createdAt}
          updatedAt={repoDetail.updatedAt}
          pushedAt={repoDetail.pushedAt}
          hdr="Repo Details"
        />
        <MetaData createdAt={createdAt} updatedAt={updatedAt} hdr="Stack Details" />
      </section> */}
      <StackSection stackId={stackId}/>
    </main>
  );
}

export default Stack;
