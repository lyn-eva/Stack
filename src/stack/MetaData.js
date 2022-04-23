import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { getLastModified } from '../utility/datetime';

function MetaData({ hdr, createdAt, updatedAt, pushedAt, expand, variant }) {
  return (
    <>
      <button className='absolute right-5 top-[11px] ml-4 sm:opacity-0 sm:group-hover:opacity-100 sm:top-4'>
        <Icon icon={expand ? 'icomoon-free:shrink2' : 'fa:expand'} />
      </button>
      <h3 className='mb-2 text-center font-open-sans text-t-md font-medium tracking-wide sm:text-left sm:font-semibold md:text-t-lg'>
        {hdr}
      </h3>

      <motion.div
        initial='shrink'
        animate={expand ? 'expand' : 'shrink'}
        variants={variant}
        className='overflow-hidden tracking-wide'
      >
        <hr />
        <p className='my-2 mt-4 font-semibold'>
          created at :<span className='ml-2 font-normal'>{getLastModified(createdAt)}</span>
        </p>
        <p className='my-2 font-semibold'>
          updated at :<span className='ml-2 font-normal'>{getLastModified(updatedAt)}</span>
        </p>
        {pushedAt && (
          <p className='font-semibold'>
            pushed at :<span className='ml-2 font-normal'>{getLastModified(pushedAt)}</span>
          </p>
        )}
      </motion.div>
    </>
  );
}

export default MetaData;
