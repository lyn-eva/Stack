import Location from "./Location";
import { useState } from "react";
import Detail from "./Detail";

const options = ["bg-green-600", "bg-blue-700", "bg-red-700"];

function Idea({ no, idea, stackId }) {
  const [expand, setExpand] = useState(false);

  return (
    <li className="bg-bg-soft-gray rounded-md text-white">
      <div
        onClick={() => setExpand((prev) => !prev)}
        className="cursor-pointer bg-bg-darker shadow-l2 font-lato flex justify-between items-center rounded-md py-3 relative"
      >
      <span className="font-bold mx-4 tracking-wider">{no}.</span>
        <p className="font-lighter text-lg tracking-wide pl-4 w-8/12  h-7 truncate">
          {idea.title}
        </p>
        <Location value={idea.location} />
        <span className={`${options[idea.level]} absolute top-0 right-0 h-[5px] w-24 rounded-tr-sm`}></span>
      </div>
      {expand && (
        <Detail stackId={stackId} idea={idea} handleExpand={() => setExpand(false)} />
      )}
    </li>
  );
}

export default Idea;
