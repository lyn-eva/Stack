import React from "react";
export function Title({
  bold
}) {
  return <div className="flex items-center mb-4">
        <label className={bold}>Title: </label>
        <input maxLength="34" type="text" placeholder="title" className="bg-transparen font-normal text-lg text-black rounded-sm px-1 w-full text-md outline-none" />
      </div>;
}
  