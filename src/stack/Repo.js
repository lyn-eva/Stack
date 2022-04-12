import { useState, useEffect } from "react";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import RepoFrame from "./RepoFrame";
import { motion } from "framer-motion";

const options = ["bg-green-600", "bg-blue-700", "bg-red-700"];

const variant = {
  expand: {
    height: 'auto',
  },
  shrink: {
    height: 0,
    paddingBlock: 0
  }
}

const Dues = ({dues}) => (
  <ul className="text-black mt-3">
    {!dues?.length && <p className='text-center text-text-gray mt-5'>there's no due :)</p>}
    {dues?.map(({ id, level, title }) => (
      <div key={id} className="bg-white mt-2 rounded-sm px-4 py-[5px] text-normal relative truncate">
        <span
          className={`${options[level]} absolute top-0 right-0 rounded-tr-sm h-[5px] w-24`}
        ></span>
        {title}
      </div>
    ))}
  </ul>
);

function Repo({name, stackId, shrink, onClick}) {
  const [ideas, setIdeas] = useState(null);
  const { listenToIdeas } = useDB();
  const { user } = useAuth();

  useEffect(() => {
    const unsub = listenToIdeas(stackId, setIdeas);
    return unsub;
  }, [user])

  return (
    <div className=" bg-bg-dark w-[20rem] rounded-md self-start">
      <RepoFrame onClick={onClick} name={name}/>
      <motion.div variants={variant} initial={shrink ? "shrink" : "expand"} animate={shrink ? "expand" : "shrink"} className="!px-6 text-white font-roboto overflow-hidden">
        <h2 className="font-medium mb-1">Latest dues</h2>
        <hr />
        <Dues dues={ideas}/>
      </motion.div>
    </div>
  );
}

export default Repo;
