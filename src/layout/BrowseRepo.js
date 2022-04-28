import { useEffect, useState } from 'react';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import Wrapper from '../utility/Wrapper';
import RepoItem from './RepoItem';
import ScaleLoading from '../utility/ScaleLoading';

function BrowseRepo({ stackId, setBrowseRepo }) {
  const [repos, setRepos] = useState([]);
  const [existingStacks, setExistingStacks] = useState([]);
  const { user } = useAuth();
  const { createStack, getStacks, userInfo } = useDB();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const fetchRepo = fetch(
        `https://api.github.com/user/repos`,
        {
          headers: {
            authorization: `token ${userInfo.token}`,
            Accept: "application/vnd.github.v3+json"
          },
        }
      );
      const [raw_repo, added_stacks] = await Promise.all([fetchRepo, getStacks()]);
      const repoList = await raw_repo.json();
      setRepos(repoList.map((repo) => ({ ...repo })));
      setExistingStacks(added_stacks.docs.map((stack) => stack.data().name));
    })();
  }, []);

  const handleAddRepo = (repoDetail) => {
    return async () => {
      await createStack(repoDetail);
      setBrowseRepo(false);
    };
  };

  return (
    <Wrapper className='absolute top-14 z-10 left-0  w-[90vw] max-w-[30rem] p-5 text-white'>
      <h3 className='mb-1 font-lato text-lg font-semibold leading-6 tracking-wide'>repositories</h3>
      <hr className='shadow-md'/>
      <ul className='list relative h-72 overflow-y-scroll pr-2'>
        {!repos.length && <ScaleLoading />}
        {repos.length > 0 &&
          repos.map((repo, idx) => (
            <RepoItem
              key={repo.id}
              name={repo.name}
              idx={idx}
              added={existingStacks.indexOf(repo.name) !== -1}
              handleAddRepo={handleAddRepo({name: repo.name, repo_id: repo.id, isPrivate: repo.private, langs_url: repo.languages_url, tags_url: repo.tags_url, repo_url: repo.html_url, created_at: repo.created_at, updated_at: repo.updated_at, pushed_at: repo.pushed_at})}
            />
          ))}
      </ul>
    </Wrapper>
  );
}

export default BrowseRepo;
