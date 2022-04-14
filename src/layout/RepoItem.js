import React from "react";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

function RepoItem({ id, name, url, idx, added, handleAddRepo }) {
  return (
    <li className="mt-1 flex list-outside list-decimal items-center justify-between gap-3 border-b-[1px] border-[#ffffff70] pt-2 pb-1">
      <p className="truncate">
        <span className="mr-2 text-lg">{idx + 1}.</span>
        <Iconify
          style={{ marginRight: ".8rem" }}
          data-width={23}
          data-icon="ri:git-repository-line"
        />
        {name}
      </p>
      {/* <div className='flex items-center gap-2'> */}
      {added ? (
        <span className="inline-block w-12 text-[11px] leading-6">
          added <Iconify data-icon="dashicons:yes-alt" />
        </span>
      ) : (
        <Button
          onClick={() => handleAddRepo(name, url)}
          style={{ color: "#000", paddingBlock: "0", borderRadius: "4px" }}
        >
          add
        </Button>
      )}
      {/* </div> */}
    </li>
  );
}

export default RepoItem;
