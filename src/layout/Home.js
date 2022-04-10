import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import Repo from "../stack/Repo";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
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
  }, [user]);

  return (
    <main className="mb-16">
      <ul className="flex gap-4">
        <li className="relative">
          <Button onClick={() => setBrowseRepo((prev) => !prev)}>
            Browse Repo
            <Iconify
              data-icon="fe:search"
              data-width="20"
              data-flip="horizontal"
              style={{ marginLeft: ".5rem" }}
            />
          </Button>
          {browseRepo && <BrowseRepo setBrowseRepo={setBrowseRepo} />}
        </li>
        <li>
          <Button onClick={() => setShrink((prev) => !prev)}>
            Shrink all
            <Iconify
              data-icon="lucide:shrink"
              data-width="20"
              style={{ marginLeft: ".5rem" }}
            />
          </Button>
        </li>
      </ul>
      <section className="mt-14 flex gap-5 text-white">
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
