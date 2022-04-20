import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import LoadingSpinner from "../utility/LoadingSpinner";
import Wrapper from "../utility/Wrapper";
import RepoItem from "./RepoItem";

function BrowseRepo({ stackId, setBrowseRepo }) {
  const [repos, setRepos] = useState([]);
  const [existingStacks, setExistingStacks] = useState([]);
  const { user, token } = useAuth();
  const { createStack, getStacks, getUserInfo } = useDB();
  
  useEffect(() => {
    if (!user) return;
    (async () => {
      const userInfo = await getUserInfo();
      const fetchRepo = fetch(
        `https://api.github.com/user/repos`,
        {
          headers: {
            authorization: `token ${userInfo.data().token}`,
            Accept: "application/vnd.github.v3+json"
          },
        }
      );
      const [raw_repo, added_stacks] = await Promise.all([fetchRepo, getStacks()]);
      const repoList = await raw_repo.json();
      setRepos(repoList.map(({ id, name, html_url }) => ({ id, name, html_url })));
      setExistingStacks(added_stacks.docs.map((stack) => stack.data().name));
    })();
  }, []);

  const handleAddRepo = (repo, url) => {
    return async () => {
      await createStack(repo, url);
      setBrowseRepo(false);
    };
  };

  return (
    <Wrapper className="absolute top-14 z-10 h-[21rem] w-[90vw] max-w-[30rem] overflow-y-scroll p-5 text-white">
      <h3 className="mb-1 font-lato text-lg font-semibold leading-6 tracking-wide">
        repositories
      </h3>
      <hr />
      {!repos.length && <LoadingSpinner />}
      <ul className="list relative">
        {repos.length > 0 &&
          repos.map((repo, idx) => (
            <RepoItem
              key={repo.id}
              {...repo}
              idx={idx}
              added={existingStacks.indexOf(repo.name) !== -1}
              handleAddRepo={handleAddRepo(repo.name, repo.html_url)}
            />
          ))}
      </ul>
    </Wrapper>
  );
}

export default BrowseRepo;
