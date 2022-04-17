import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import Iconify from "../utility/Iconify";
import Wrapper from "../utility/Wrapper";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackIdea from "./StackIdeas";

const variant = {
  expand: {
    height: "auto",
  },
  shrink: {
    height: 0,
  },
};

function Stack() {
  const [repoDetail, setRepoDetail] = useState({});
  const [stack, setStack] = useState(null);
  const [expand, setExpand] = useState(false);
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
    <main className="mb-8 mt-10 justify-between sm:mt-16 lg:flex">
      <section className="sm:flex lg:w-[21.5rem] sm:gap-6">
        <Wrapper
          onClick={() => setExpand((prev) => !prev)}
          className="relative self-start sm:w-1/2"
        >
          {expand || (
            <motion.h1 className="truncate px-8 py-2 sm:py-3 text-center text-white sm:text-lg">
              {repoName}
            </motion.h1>
          )}
          <motion.div
            variants={variant}
            initial="initial"
            animate={expand ? "expand" : "shrink"}
            className="overflow-hidden"
          >
            <RepoFrame name={repoName} />
          </motion.div>
          <button
            className={`absolute bottom-2 right-4 text-white ${expand? '' : 'sm:bottom-4'}`}
          >
            <Iconify data-icon={"icomoon-free:shrink2"} />
          </button>
        </Wrapper>
        <div className="mt-3 sm:mt-0 sm:w-1/2">
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
