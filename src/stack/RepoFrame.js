import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import Wrapper from "../utility/Wrapper";

const Tags = ({langs}) => (
  <div className="p-2 flex gap-3 items-center">
    {langs?.map((lang) => (
      <span key={lang} className="bg-white px-2 rounded-sm">
        {lang}
      </span>
    ))}
  </div>
);

function RepoFrame({ name, onClick }) {
  const [langs, setLangs] = useState([]);
  const { user } = useAuth();
  const username = user?.reloadUserInfo.screenName;
  
  useEffect(() => {
    if (!user) return;
    (async () => { //IIFE
      const raw = await fetch(`https://api.github.com/repos/${username}/${name}/languages`);
      const languages = await raw.json();
      setLangs(Object.keys(languages));
    })() 
  }, [user]);

  return (
    <Wrapper className="shadow-l2">
      <img
        onClick={onClick} 
        className="w-full rounded-md cursor-pointer"
        src={`https://opengraph.githubassets.com/7f2ba92f5efee9acbcc467a61e76d8d741f235827a1c1d88da06297a17d175e6/${username}/${name}`}
        alt={name}
      />
      <Tags langs={langs}/>
    </Wrapper>
  );
}

export default RepoFrame;
