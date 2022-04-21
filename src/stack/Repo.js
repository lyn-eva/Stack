import Dues from './Dues';
import { useState, useEffect } from "react";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import RepoFrame from "./RepoFrame";
import { motion } from "framer-motion";

const variant = {
  expand: {
    height: 'auto',
    padding: '1.5rem',
    transition: {type: 'tween' },
  },
  shrink: {
    height: 0,
    padding: '0 1.5rem'
  }
}

function Repo({name, stackId, shrink, onClick}) {
  const [ideas, setIdeas] = useState(null);
  const { listenToIdeas } = useDB();
  const { user } = useAuth();

  useEffect(() => {
    const unsub = listenToIdeas(stackId, setIdeas);
    return unsub;
  }, [user, stackId, listenToIdeas])

  return (
    <div className=" bg-bg-dark rounded-md w-full max-w-[21.5rem] sm:max-w-[23.5rem] lg:max-w-[21.5rem] mx-auto self-start">
      <RepoFrame onClick={onClick} name={name}/>
      <motion.div variants={variant} animate={shrink ? "shrink" : "expand"} initial={shrink ? "expand" : "shrink"} className=" text-white font-roboto overflow-hidden">
        <h2 className="font-medium mb-1">Latest dues</h2>
        <hr />
        <Dues dues={ideas}/>
      </motion.div>
    </div>
  );
}

export default Repo;
