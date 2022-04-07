import React from "react";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

function RepoItem({ id, name, url, idx, handleAddRepo }) {
  return (
    <li className="list-decimal list-outside flex items-center justify-between pt-2 pb-1 mt-1 border-b-[1px] border-[#ffffff70]">
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
          onClick={() => handleAddRepo(name, url)}
          style={{ color: "#000", paddingBlock: "0", borderRadius: "4px" }}
        >
          add
        </Button>
      </div>
    </li>
  );
}

export default RepoItem;
