import { useEffect, useState } from 'react';
import { useDB } from '../context/dbProvider';
import Wrapper from '../utility/Wrapper';

function RepoFrame({ repo_name, langs_url, onClick }) {
  const [langs, setLangs] = useState([]);
  const { userInfo } = useDB();
  
  useEffect(() => {
    if (!userInfo.username) return;
    (async () => { //IIFE
      const raw = await fetch(langs_url);
      setLangs(Object.keys(await raw.json()));
    })();
  }, [userInfo, langs_url, repo_name]);

  return (
    <>
      {userInfo.username && (
        <Wrapper className='max-w-[24.5rem] shadow-l2'>
          <img
            onClick={onClick}
            className='w-full cursor-pointer rounded-md'
            src={`https://opengraph.githubassets.com/${repo_name}/${userInfo.username}/${repo_name}`}
            alt={repo_name}
          />
          <div className='flex items-center gap-3 p-2 text-black overflow-x-auto'>
            {langs?.map((lang) => (
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
