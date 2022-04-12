import { useState } from "react";
import Location from "./Location";
import Detail from "./Detail";
import { motion } from "framer-motion";

const options = ["bg-green-600", "bg-blue-700", "bg-red-700"];

const variant = {
  expand: {
    height: "auto",
    opacity: 1,
    paddingBlock: ".8rem",
    transition: { bounce: 0, duration: 2 },
  },
  shrink: {
    height: 0,
    opacity: 0,
    paddingBlock: 0,
    transition: { bounce: 0, duration: 2 },
  },
};

function Idea({ idx, idea, stackId }) {
  const [expand, setExpand] = useState(false);

  return (
    <motion.li drag layout className="rounded-md bg-bg-soft-gray text-white">
      <div
        onClick={() => setExpand((prev) => !prev)}
        className="relative flex cursor-pointer items-center justify-between rounded-md bg-bg-darker py-3 font-lato shadow-l2"
      >
        <span className="mx-4 font-bold tracking-wider">{idx}.</span>
        <p className="font-lighter h-7 w-8/12 truncate pl-4  text-lg tracking-wide">
          {idea.title}
        </p>
        <Location value={idea.location} />
        <span
          className={`${
            options[idea.level]
          } absolute top-0 right-0 h-[5px] w-24 rounded-tr-sm`}
        ></span>
      </div>
      <motion.div
        variants={variant}
        initial='expand'
        animate='shrink'
        className="relative overflow-hidden rounded-md bg-bg-soft-gray px-6 text-white"
      >
        <Detail stackId={stackId} idea={idea} handleExpand={() => setExpand(false)} />
      </motion.div>
    </motion.li>
  );
}

export default Idea;
