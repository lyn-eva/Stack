import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import LoadingSpinner from "../utility/LoadingSpinner";
import Wrapper from "../utility/Wrapper";

function BrowseRepo({ setBrowseRepo }) {
  const [repos, setRepos] = useState([]);
  const { getUser } = useAuth();
  const { createStack } = useDB();

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    const fetchRepo = async () => {
      const raw = await fetch(
        `https://api.github.com/users/${user.reloadUserInfo.screenName}/repos`
      );
      const repoList = await raw.json();
      setRepos(repoList.map(({ id, name, html_url }) => ({ id, name, html_url })));
    };
    fetchRepo();
  }, []);

  const handleAddRepo = async (repo) => {
    await createStack(repo);
    setBrowseRepo(false);
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
          repos.map(({ id, name }, idx) => (
            <li
              key={id}
              className="list-decimal list-outside flex items-center justify-between pt-2 pb-1 mt-1 border-b-[1px] border-[#ffffff70]"
            >
              <p>
                <span className="text-lg mr-2">{idx + 1}.</span>
                <Iconify
                  style={{ marginRight: ".8rem" }}
                  data-width={23}
                  data-icon="ri:git-repository-line"
                />
                {name}
              </p>
              <div>
                <span className="mr-4 text-[11px] leading-6">
                  added <Iconify data-icon="dashicons:yes-alt" />
                </span>
                <Button
                  onClick={() => handleAddRepo(name)}
                  style={{ color: "#000", paddingBlock: "0", borderRadius: "4px" }}
                >
                  add
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
}

export default BrowseRepo;
