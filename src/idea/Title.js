import { useState, useRef } from "react";
import Iconify from "../utility/Iconify";

function Title({ value, rename, ref, handleChange, handleRename }) {

  // const handleBlur = () => {
  //   if (initial) return;
  //   setRename(false);
  // };

  return (
    <div className="flex items-center mb-4 relative pr-6 group">
      <label className={"font-exo font-semibold text-[1rem] tracking-wide mr-3 pt-[3px]"}>Title: </label>
      <input
        onChange={handleChange}
        // onBlur={handleBlur}
        disabled={!rename}
        value={value}
        maxLength="34"
        type="text"
        ref={ref}
        placeholder="title"
        className={`${
          rename ? "bg-white text-black" : "bg-transparent"
        } font-normal text-lg rounded-sm px-2 w-full text-md outline-none tracking-wide`}
      />
      <button
        onClick={handleRename}
        className="absolute -top-[1px] right-0 ml-4 opacity-0 group-hover:opacity-100"
      >
        <Iconify data-width={13} data-icon="fa6-solid:pencil" />
      </button>
    </div>
  );
}

export default Title;
