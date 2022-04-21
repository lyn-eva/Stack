import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import Repo from "../stack/Repo";
import Button from "../utility/Button";
import { Icon } from "@iconify/react";
import BrowseRepo from "./BrowseRepo";

function Home() {
  const [browseRepo, setBrowseRepo] = useState(false);
  const [stacks, setStacks] = useState(null);
  const [shrink, setShrink] = useState(false);
  const { listenToStacks } = useDB();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const unsub = listenToStacks(setStacks);
    return unsub;
  }, [user, listenToStacks]);

  return (
    <main className="mb-8 mt-[3vw]">
      <ul className="flex gap-4">
        <li className="relative">
          <Button onClick={() => setBrowseRepo((prev) => !prev)}>
            Browse Repo
            <Icon
              icon="fe:search"
              flip="horizontal"
              className='lg:ml-2'
            />
          </Button>
          {browseRepo && <BrowseRepo setBrowseRepo={setBrowseRepo} />}
        </li>
        <li>
          <Button onClick={() => setShrink((prev) => !prev)}>
            Shrink all
            <Icon
              icon={shrink ? "lucide:expand" : "lucide:shrink"}
              className='lg:ml-2'
            />
          </Button>
        </li>
      </ul>
      <section className="mt-8 grid grid-cols-1 gap-y-8 overflow-x-auto pb-8 text-white sm:grid-cols-2 sm:gap-6 md:gap-[5vw] lg:mt-14 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {!stacks?.length && "** no stack has been created **"}
        {stacks?.map(({ id, name }) => {
          return (
            <Repo
              onClick={() => navigate("../" + id)}
              key={id}
              stackId={id}
              name={name}
              shrink={shrink}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Home;
