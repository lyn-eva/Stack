import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useDevice from "../custom-hook/useDevice";
import Wrapper from "../utility/Wrapper";
import RepoFrame from "./RepoFrame";
import Iconify from "../utility/Iconify";

const variant = {
  expand: {
    height: "auto",
  },
  shrink: {
    height: 0,
  },
};

const shouldExpand = (device) => (device === "mobile" ? false : true);

export function RepoCard({ repoName }) {
  const device = useDevice();
  const [expand, setExpand] = useState(shouldExpand(device));

  useEffect(() => {
    setExpand(shouldExpand(device));
  }, [device]);

  return (
    <Wrapper
      onClick={() => setExpand((prev) => !prev)}
      className="relative self-start sm:w-1/2 lg:w-full"
    >
      {expand || (
        <motion.h1 className="truncate px-8 py-2 text-center text-white sm:py-3 sm:text-lg">
          {repoName}
        </motion.h1>
      )}
      <motion.div
        variants={variant}
        initial="initial"
        animate={expand ? "expand" : "shrink"}
        className="overflow-hidden"
      >
        <RepoFrame name={repoName} />
      </motion.div>
      <button
        className={`absolute bottom-2 right-4 text-white ${expand ? "" : "sm:bottom-4"}`}
      >
        <Iconify data-icon={"icomoon-free:shrink2"} />
      </button>
    </Wrapper>
  );
}
