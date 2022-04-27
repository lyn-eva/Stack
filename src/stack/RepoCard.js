import { motion } from "framer-motion";
import RepoFrame from "./RepoFrame";
import { Icon } from "@iconify/react";

export function RepoCard({ repoName, variant, expand }) {
  return (
    <>
      {expand || (
        <motion.h1 className="truncate pl-7 pr-9 py-2 text-center text-white sm:py-3 sm:text-lg">
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
        className={`absolute sm:opacity-0 sm:group-hover:opacity-100 right-4 text-white ${
          expand ? "bottom-2" : "bottom-3 sm:bottom-4"
        }`}
      >
        <Icon width={16} icon={expand ? "icomoon-free:shrink2" : "fa:expand"} />
      </button>
    </>
  );
}
export default RepoCard;
