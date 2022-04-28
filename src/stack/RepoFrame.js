import { useEffect, useState } from 'react';
import { useDB } from '../context/dbProvider';
import Wrapper from '../utility/Wrapper';

function RepoFrame({ repo_id, onClick }) {
  const [repo, setRepo] = useState({name: null, langs: []})
  // const [langs, setLangs] = useState([]);
  const { userInfo } = useDB();
  
  useEffect(() => {
    if (!userInfo.username) return;
    (async () => {//IIFE
      const rawRepo = await fetch(`https://api.github.com/repositories/${repo_id}`);
      const repoDetail = await rawRepo.json();
      const raw = await fetch(repoDetail.languages_url);
      const languages = await raw.json();
      setRepo({name: repoDetail.name, langs: Object.keys(languages)});
    })();
  }, [userInfo]);

  return (
    <>
      {userInfo.username && (
        <Wrapper className='max-w-[24.5rem] shadow-l2'>
          <img
            onClick={onClick}
            className='w-full cursor-pointer rounded-md'
            src={`https://opengraph.githubassets.com/${repo.name}/${userInfo.username}/${repo.name}`}
            alt={repo.name}
          />
          <div className='flex items-center gap-3 p-2 text-black overflow-x-auto'>
            {repo.langs?.map((lang) => (
              <span key={lang} className='rounded-sm bg-white px-2 text-t-sm sm:text-t-md'>
                {lang}
              </span>
            ))}
          </div>
        </Wrapper>
      )}
    </>
  );
}

export default RepoFrame;
