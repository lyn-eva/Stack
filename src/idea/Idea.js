import Location from "./Location";
import { useState } from "react";

import Detail from "./Detail";


function Idea({ no, idea, line, file }) {
  const [expand, setExpand] = useState(false);

  return (
    <li className="bg-bg-soft-gray rounded-md text-white mb-3">
      <div
        onClick={() => setExpand((prev) => !prev)}
        className="cursor-pointer bg-bg-darker shadow-l2 font-lato flex justify-between items-center rounded-md px-6 py-3"
      >
        <p className="font-lighter text-lg tracking-wide">
          <span className="font-bold mr-4">{no}.</span> {idea}
        </p>
        <Location file={file} line={line} />
      </div>
      {expand && <Detail />}
    </li>
  );
}

export default Idea;
