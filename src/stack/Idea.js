import React from "react";
import Iconify from "../utility/Iconify";
import IdeaEditFraction from "./ideaEditFraction";

const Location = ({ file, line }) => (
  <p className="font-exo font-light text-sm">
    line <span className="text-[#23dc41] mx-1">{line}</span> at{" "}
    <span className="text-[#1BF9F9] mx-1">{file}</span>
  </p>
);

function Idea({ no, idea, line, file, expand }) {
  return (
    <li className="bg-bg-soft-gray rounded-md text-white mb-3">
      <div className="bg-bg-darker shadow-l2 font-lato flex justify-between items-center rounded-md px-6 py-3">
        <p className="font-lighter text-lg tracking-wide">
          <span className="font-bold mr-4">{no}.</span> {idea}
        </p>
        <Location file={file} line={line} />
      </div>
      {expand && (
        <div className="px-5 pt-4 py-1">
          <div className="group relative">
            <h4 className="font-exo font-semibold tracking-wide mb-1">
              Description
            </h4>
            <button className="absolute -top-[2px] left-[5.3rem] ml-4 opacity-0 group-hover:opacity-100">
              <Iconify data-width={13} data-icon="fa6-solid:pencil" />
            </button>
          </div>
          <hr />
          <p className="my-1 font-light text-[1.05rem]">
            there are many nested div which make the rendering process slow. Remove those
            or replace with React Fragment.
          </p>
          <IdeaEditFraction file={file} line={line} Location={Location} />
        </div>
      )}
    </li>
  );
}

export default Idea;
