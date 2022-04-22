import { useEffect, useState } from 'react';
import { useDB } from '../context/dbProvider';
import Wrapper from '../utility/Wrapper';

function RepoFrame({ name, onClick }) {
  const [langs, setLangs] = useState([]);
  const { userInfo } = useDB();
  
  useEffect(() => {
    if (!name || !userInfo.username) return;
    (async () => {
      //IIFE
      const raw = await fetch(
        `https://api.github.com/repos/${userInfo.username}/${name}/languages`
      );
      const languages = await raw.json();
      setLangs(Object.keys(languages));
    })();
  }, [userInfo, name]);

  return (
    <>
      {name && userInfo.username && (
        <Wrapper className='max-w-[24.5rem] shadow-l2'>
          <img
            onClick={onClick}
            className='w-full cursor-pointer rounded-md'
            src={`https://opengraph.githubassets.com/${Math.round(Math.random() * 100000)}/${
              userInfo.username
            }/${name}`}
            alt={name}
          />
          <div className='flex items-center gap-3 p-2 text-black'>
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
