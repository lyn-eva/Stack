import { useState, useRef } from "react";
import Iconify from "../utility/Iconify";

function Title({ bold }) {
  const [rename, setRename] = useState(false);
  const ref = useRef(null);

  const handleRename = () => {
    setRename((prev) => !prev);
    setTimeout(() => ref.current.focus(), 0);
  };

  return (
    <div className="flex items-center mb-4 relative pr-6">
      <label className={bold + " pt-[3px]"}>Title: </label>
      <input
        onBlur={() => setRename(false)}
        disabled={!rename}
        maxLength="34"
        type="text"
        ref={ref}
        placeholder="title"
        className={`${rename ? "bg-white text-black" : "bg-transparent"} font-normal text-lg rounded-sm px-1 w-full text-md outline-none tracking-wide`}
      />
      <button
        onClick={handleRename}
        className="absolute -top-[1px] right-0 ml-4 opacity- group-hover:opacity-100"
      >
        <Iconify data-width={13} data-icon="fa6-solid:pencil" />
      </button>
    </div>
  );
}

export default Title;
