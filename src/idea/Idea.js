import { useState } from "react";
import Iconify from "../utility/Iconify";
import Description from "./Description";
import IdeaEditFraction from "./ideaEditFraction";

const Location = ({ file, line }) => (
  <p className="font-exo font-light text-sm">
    line <span className="text-[#23dc41] mx-1">{line}</span> at{" "}
    <span className="text-[#1BF9F9] mx-1">{file}</span>
  </p>
);

function Idea({ no, idea, line, file }) {
  const [expand, setExpand] = useState(false);


  return (
    <li className="cursor-pointer bg-bg-soft-gray rounded-md text-white mb-3">
      <div onClick={() => setExpand(prev => !prev)} className="bg-bg-darker shadow-l2 font-lato flex justify-between items-center rounded-md px-6 py-3">
        <p className="font-lighter text-lg tracking-wide">
          <span className="font-bold mr-4">{no}.</span> {idea}
        </p>
        <Location file={file} line={line} />
      </div>
      {expand && (
        <div className="px-3 pt-4 py-1">
          <Description />
          <IdeaEditFraction file={file} line={line} Location={Location} />
        </div>
      )}
    </li>
  );
}

export default Idea;
