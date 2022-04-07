import React from "react";
import Iconify from "../utility/Iconify";

const btnStyle =
  "font-normal text-[13px] tracking-wide underline underline-offset-1 px-2 rounded-sm";

function IdeaEditFraction({ file, line, Location }) {
  return (
    <>
      <div className="font-exo flex justify-between items-center mt-5 mb-[5px]">
        <div className="flex gap-3 items">
          <button className={btnStyle + " bg-green-600"}>trivial</button>
          <button className={btnStyle + " bg-blue-600"}>moderate</button>
          <button className={btnStyle + " bg-red-500"}>urgent</button>
        </div>
        <div className="group flex gap-4">
          <button className="-mt-1 opacity-0 group-hover:opacity-100">
            <Iconify data-width={13} data-icon="fa6-solid:pencil" />
          </button>
          <Location file={file} line={line} />
        </div>
      </div>
      <hr />
      <div className="font-light text-[13px] flex justify-end gap-5 mt-1">
        <p>
          last modified: <span className="font-normal">3 min ago</span>
        </p>
        <p>
          created at: <span className="font-normal">12/27/2021</span>
        </p>
      </div>
    </>
  );
}

export default IdeaEditFraction;
