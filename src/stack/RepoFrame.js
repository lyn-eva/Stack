import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import Wrapper from "../utility/Wrapper";

const Tags = ({ langs }) => (
  <div className="p-2 flex gap-3 items-center text-black">
    {langs?.map((lang) => (
      <span key={lang} className="text-t-sm sm:text-t-md bg-white px-2 rounded-sm">
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
    if (!name || !username) return;
    (async () => {
      //IIFE
      const raw = await fetch(
        `https://api.github.com/repos/${username}/${name}/languages`
      );
      const languages = await raw.json();
      setLangs(Object.keys(languages));
    })();
  }, [username, name]);

  return (
    <>
      {name && username && (
        <Wrapper className="shadow-l2 max-w-[24.5rem]">
          <img
            onClick={onClick}
            className="w-full rounded-md cursor-pointer"
            src={`https://opengraph.githubassets.com/${Math.round(Math.random()*100000)}/${username}/${name}`}
            alt={name}
          />
          <Tags langs={langs} />
        </Wrapper>
      )}
    </>
  );
}

export default RepoFrame;
