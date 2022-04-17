import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Location from "./Location";
import Detail from "./Detail";

const options = ["bg-green-600", "bg-blue-700", "bg-red-700"];

function Idea({ idx, idea, stackId }) {
  const [expand, setExpand] = useState(false);

  return (
    <motion.li
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0, margin: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3 sm:mb-4 rounded-md bg-bg-soft-gray text-white"
    >
      <div
        onClick={() => setExpand((prev) => !prev)}
        className="relative flex cursor-pointer items-center justify-between rounded-md bg-bg-darker py-2 sm:py-3 font-lato shadow-l2"
      >
        <span className="ml-3 text-t-sm sm:text-t-lg font-medium tracking-wider sm:mx-4 sm:font-bold">
          {idx}.
        </span>
        <p className="font-light font-roboto ml-0 w-6/12 truncate text-t-md tracking-wide sm:ml-4 sm:w-8/12 sm:text-lg">
          {idea.title}
        </p>
        <Location value={idea.location} />
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
