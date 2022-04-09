import Location from "./Location";
import { useState } from "react";
import Detail from "./Detail";

function Idea({idea, stackId}) {
  const [expand, setExpand] = useState(false);

  return (
    <li className="bg-bg-soft-gray rounded-md text-white">
      <div
        onClick={() => setExpand((prev) => !prev)}
        className="cursor-pointer bg-bg-darker shadow-l2 font-lato flex justify-between items-center rounded-md px-6 py-3"
      >
        <p className="font-lighter text-lg tracking-wide pl-4">{idea.title}</p>
        <Location value={idea.location} />
      </div>
      {expand && <Detail stackId={stackId} idea={idea} handleExpand={() => setExpand(false)}/>}
    </li>
  );
}
/* <span className="font-bold mr-4">{no}.</span> */

// created: at {seconds: 1649483802, nanoseconds: 69000000}
// description: "nome! Nozarashi!!!"
// id: "DOXBSIZsFNDsmS7qGdZN"
// level: 2
// location: {file: 'Banakai.js', line: '458'}
// modified: at {seconds: 1649483802, nanoseconds: 69000000}
// title: "Zaraki Kenpachi"
export default Idea;
