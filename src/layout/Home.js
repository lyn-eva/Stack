import { useState } from "react";
import { useNavigate } from "react-router";
import { useDB } from "../context/dbProvider";
import Repo from "../stack/Repo";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import LoadingSpinner from "../utility/LoadingSpinner";
import BrowseRepo from "./BrowseRepo";

function Home() {
  const [browseRepo, setBrowseRepo] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { stacks } = useDB();

  const navigate = useNavigate();

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
          <Button onClick={() => setShrink(prev => !prev)}>
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
        {!Object.keys(stacks).length && "** no stack has been created **"}
        {Object.values(stacks)?.map(({id, name}) => {
          return <Repo onClick={() => navigate('../'+id)} key={id} id={id} name={name} shrink={shrink}/>;
        })}
      </section>
    </main>
  );
}

export default Home;
