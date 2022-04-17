import { useState } from "react";
import { motion } from "framer-motion";
import { getLastModified } from "../utility/datetime";
import Iconify from "../utility/Iconify";
import Wrapper from "../utility/Wrapper";

const variant = {
  expand: {
    height: "auto",
  },
  shrink: {
    height: 0,
  },
};

function MetaData({ hdr, createdAt, updatedAt, pushedAt }) {
  const [expand, setExpand] = useState(true);

  return (
    <Wrapper
      onClick={() => setExpand((prev) => !prev)}
      className={`${expand ? 'pb-3' : ''} group relative mb-3 px-4 pt-2 font-lato text-white shadow-l2 sm:mb-5 sm:p-4 sm:pb-2`}
    >
      <button className="absolute right-5 top-1 ml-4 opacity-0 group-hover:opacity-100 sm:top-4">
        <Iconify data-icon={expand ? "icomoon-free:shrink2" : "fa:expand"} />
      </button>
      <h3 className="mb-2 text-center font-open-sans text-t-md font-medium tracking-wide sm:text-left sm:font-semibold">
        {hdr}
      </h3>

      <motion.div
        initial="shrink"
        animate={expand ? "expand" : "shrink"}
        variants={variant}
        className="overflow-hidden tracking-wide"
      >
        <hr />
        <p className="my-2 mt-4 font-semibold">
          created at :{" "}
          <span className="ml-1 font-normal">{getLastModified(createdAt)}</span>
        </p>
        <p className="my-2 font-semibold">
          updated at :{" "}
          <span className="ml-1 font-normal">{getLastModified(updatedAt)}</span>
        </p>
        {pushedAt && (
          <p className="font-semibold">
            pushed at :{" "}
            <span className="ml-1 font-normal">{getLastModified(pushedAt)}</span>
          </p>
        )}
      </motion.div>
    </Wrapper>
  );
}

export default MetaData;
