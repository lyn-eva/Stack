import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import LoadingSpinner from "../utility/LoadingSpinner";
import Wrapper from "../utility/Wrapper";
import RepoItem from "./RepoItem";

function BrowseRepo({ stackId, setBrowseRepo }) {
  const [repos, setRepos] = useState([]);
  const [existingStacks, setExistingStacks] = useState([]);
  const { getUser } = useAuth();
  const { createStack, getStacks } = useDB();

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    (async () => {
      const fetchRepo = fetch(`https://api.github.com/users/${user.reloadUserInfo.screenName}/repos`);
      const [raw_repo, added_stacks] = await Promise.all([fetchRepo, getStacks()]);
      const repoList = await raw_repo.json();
      setRepos(repoList.map(({ id, name, html_url }) => ({ id, name, html_url })));
      setExistingStacks(added_stacks.docs.map(stack => stack.data().name));
    })();
  }, []);

  const handleAddRepo = (repo, url) => {
    return async () => {
      await createStack(repo, url);
      setBrowseRepo(false);
    };
  };

  return (
    <Wrapper className="absolute top-14 w-[90vw] max-w-[30rem] h-[21rem] overflow-y-scroll text-white p-5 z-10">
      <h3 className="mb-1 font-lato font-semibold tracking-wide text-lg leading-6">
        repositories
      </h3>
      <hr />
      {!repos.length && <LoadingSpinner />}
      <ul className="relative list-decimal list-outside list">
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
