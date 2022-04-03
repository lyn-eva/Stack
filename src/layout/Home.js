import { useState } from "react";
import Repo from "../stack/Repo";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import BrowseRepo from "./BrowseRepo";

function Home() {
  const [browseRepo, setBrowseRepo] = useState(false);

  return (
    <main className="mb-16">
      <ul className="flex gap-4">
        <li className='relative'>
          <Button onClick={() => setBrowseRepo(prev => !prev)} >
            Browse Repo
            <Iconify
              data-icon="fe:search"
              data-width="20"
              data-flip="horizontal"
              style={{ marginLeft: ".5rem" }}
            />
          </Button>
          {browseRepo && <BrowseRepo setBrowseRepo={setBrowseRepo}/>}
        </li>
        <li>
          <Button>
            Shrink all
            <Iconify
              data-icon="lucide:shrink"
              data-width="20"
              style={{ marginLeft: ".5rem" }}
            />
          </Button>
        </li>
      </ul>
      <section className="mt-14">
        <Repo />
      </section>
    </main>
  );
}

export default Home;
