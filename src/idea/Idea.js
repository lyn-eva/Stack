import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDB } from "../context/dbProvider";
import Location from "./Location";
import Detail from "./Detail";

const options = ["bg-green-600", "bg-blue-700", "bg-red-700"];

function Idea({ idx, idea, stackId }) {
  const [expand, setExpand] = useState(false);
  const { updateIdea } = useDB();

  const handleClick = (e) => {
    if (e.target.type === "checkbox") return;
    setExpand((prev) => !prev);
  };

  const handleCheck = (e) => {
    updateIdea(stackId, idea.id, {checked : !idea.checked})
  };

  return (
    <motion.li
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0, margin: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3 rounded-md bg-bg-soft-gray text-white sm:mb-4"
    >
      <div
        onClick={handleClick}
        className="relative flex cursor-pointer items-center justify-between rounded-md bg-bg-darker px-3 py-2 font-lato shadow-l2 sm:py-3"
      >
        <span className="text-t-sm font-medium tracking-wider sm:mx-4 sm:text-t-lg sm:font-bold">
          {idx}.
        </span>
        <p className="ml-2 mr-auto w-6/12 truncate font-roboto text-t-md font-light tracking-wide sm:ml-4 sm:w-8/12 sm:text-lg">
          {idea.title}
        </p>
        <Location value={idea.location} />
        <input
          checked={!!idea.checked}
          onChange={handleCheck}
          type="checkbox"
          className='after-w-2 ml-auto aspect-square w-3 cursor-pointer rounded-sm bg-white after:ml-[5px] after:mt-[2px] after:block after:h-[6px] after:w-[3px] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:content-[""] checked:bg-blue-600 sm:w-5 after:sm:ml-[6px] after:sm:mt-[1px] after:sm:h-3 after:sm:w-[6px] after:sm:border-b-[3px] after:sm:border-r-[3px]'
        />
        <span
          className={`${
            options[idea.level]
          } absolute top-0 right-0 h-[3px] w-16 rounded-tr-sm sm:h-[5px] sm:w-24`}
        ></span>
      </div>
      <AnimatePresence>
        {expand && (
          <Detail stackId={stackId} idea={idea} handleExpand={() => setExpand(false)} />
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default Idea;
