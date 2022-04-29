import React from "react";
import Button from "../utility/Button";
import { Icon } from "@iconify/react";

function RepoItem({ name, idx, added, isPrivate, handleAddRepo }) {
  return (
    <li className="mt-1 flex list-outside list-decimal items-center justify-between gap-3 border-b-[1px] border-[#ffffff70] pt-2 pb-1">
      <div className="truncate flex items-center">
        <span className="mr-2 text-lg">{idx + 1}.</span>
        <Icon className={`${isPrivate ? 'text-yellow-400': ''} min-h-[1.25rem] min-w-[1.25rem] mr-3`} icon="ri:git-repository-line" />
        <span className='truncate'>{name}</span>
      </div>
      {added ? (
        <span className="gap-1 w-12 text-[11px] leading-6 flex items-center">
          added <Icon icon="dashicons:yes-alt" />
        </span>
      ) : (
        <Button
          onClick={handleAddRepo}
          style={{ color: "#000", paddingBlock: "0", borderRadius: "4px" }}
        >
          add
        </Button>
      )}
    </li>
  );
}

export default RepoItem;
