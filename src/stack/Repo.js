import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useDB } from '../context/dbProvider';
import { useAuth } from '../context/authProvider';
import RepoFrame from './RepoFrame';
import Dues from './Dues';

const variant = {
  expand: {
    height: 'auto',
    padding: '1.5rem',
    transition: { type: 'tween' },
  },
  shrink: {
    height: 0,
    padding: '0 1.5rem',
  },
};

function Repo({ name, stackId, shrink }) {
  const [expand, setExpand] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const { listenToIdeas } = useDB();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = listenToIdeas(stackId, setIdeas);
    return unsub;
  }, [user, stackId, listenToIdeas]);

  return (
    <div className=' mx-auto w-full max-w-[21.5rem] self-start rounded-md bg-bg-dark sm:max-w-[23.5rem] lg:max-w-[21.5rem]'>
      <RepoFrame onClick={() => navigate(`../s/${stackId}`)} name={name} />
      <motion.div
        variants={variant}
        animate={shrink ? 'shrink' : 'expand'}
        initial={shrink ? 'expand' : 'shrink'}
        className={`${
          expand ? 'max-h-none' : 'max-h-[16.7rem]'
        } relative overflow-hidden font-roboto text-white`}
      >
        <h2 className='mb-1 font-medium'>Latest dues</h2>
        <hr />
        <Dues dues={ideas} />
        {ideas?.length > 4 && (
          <button
            onClick={() => setExpand((prev) => !prev)}
            className='absolute bottom-0 left-0 w-full bg-bg-dark pt-1 pb-2 hover:text-gray-300'
          >
            {expand ? 'see less...' : 'see more...'}
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default Repo;
