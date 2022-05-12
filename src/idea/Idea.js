import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDB } from '../context/dbProvider';
import Location from './Location';
import Detail from './Detail';

const options = ['bg-green-500', 'bg-u-blue', 'bg-u-red'];

function Idea({ idx, idea, stackId }) {
  const [expand, setExpand] = useState(false);
  const { updateIdea } = useDB();

  const handleClick = (e) => {
    if (e.target.type === 'checkbox') return;
    setExpand((prev) => !prev);
  };

  const handleCheck = (e) => {
    updateIdea(stackId, idea.id, { checked: !idea.checked });
  };

  return (
    <motion.li
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0, margin: 0 }}
      transition={{ duration: 0.3 }}
      className='mb-3 rounded-md bg-bg-soft-gray text-white sm:mb-4'
    >
      <div
        onClick={handleClick}
        className='relative flex cursor-pointer items-center justify-between rounded-md bg-bg-darker px-3 py-3 font-lato shadow-l2'
      >
        <span className='text-t-sm font-medium tracking-wider sm:mx-4 sm:text-t-lg sm:font-bold'>
          {idx}.
        </span>
        <p className='ml-2 mr-auto w-6/12 truncate font-roboto text-[14px] font-light tracking-wide sm:ml-4 sm:w-8/12 sm:text-lg'>
          {idea.title}
        </p>
        <Location value={idea.location} />
        <input
          checked={!!idea.checked}
          onChange={handleCheck}
          type='checkbox'
          className='cursor-pointer sm:h-5 sm:w-5'
        />
        <span
          className={`${
            options[idea.level]
          } absolute top-0 right-0 h-[3px] w-16 rounded-tr-sm sm:h-[5px] sm:w-24`}
        ></span>
      </div>
      <AnimatePresence>
        {expand && <Detail stackId={stackId} idea={idea} handleExpand={() => setExpand(false)} />}
      </AnimatePresence>
    </motion.li>
  );
}

export default Idea;
