import React from "react";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import Wrapper from "../utility/Wrapper";

const repos = ["relife messaging app", "Quize", "trello-clone"];

function BrowseRepo({setBrowseRepo}) {
  const handleAddRepo = () => {
    setBrowseRepo(false);
  }

  return (
    <Wrapper className="absolute top-14 w-[90vw] max-w-[30rem] text-white p-5">
      <h3 className="mb-1 font-lato font-semibold tracking-wide">repositories</h3>
      <hr />
      <ul>
        {repos.map((repo) => (
          <li className="flex items-center justify-between pt-2 pb-1 mt-1 border-b-[1px] border-[#ffffff70]">
            <p>
              <Iconify
                style={{ marginRight: ".8rem" }}
                data-width={23}
                data-icon="ri:git-repository-line"
              />
              {repo}
            </p>
            <Button onClick={handleAddRepo} style={{ color: "#000", paddingBlock: "0" }}>add</Button>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

export default BrowseRepo;
