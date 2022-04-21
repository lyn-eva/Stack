import { useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLastModified } from '../utility/datetime';
import { useDB } from '../context/dbProvider';
import Description from './Description';
import Title from './Title';
import Levels from './Levels';
import Location from './Location';
import EnhancedFormField from '../hoc/EnhancedFormField';
import { Icon } from '@iconify/react';
import Modal from '../utility/Modal';

const variant = {
  expand: {
    height: 'auto',
    opacity: 1,
    paddingBlock: '.8rem',
    transition: { type: 'tween' },
  },
  shrink: {
    height: 0,
    opacity: 0,
    paddingBlock: 0,
    transition: { type: 'tween' },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TITLE':
      return {
        ...state,
        title: action.value,
        title_uppercase: action.value.toUpperCase(),
      };
    case 'DESCRIPTION':
      return { ...state, description: action.value };
    case 'LEVEL':
      return { ...state, level: action.value };
    case 'LOCATION':
      return { ...state, location: action.value };
    default:
      return { ...state };
  }
};

function Detail({ idea, handleExpand, stackId, isForm = false }) {
  const initialForm = {
    title: idea?.title ?? '',
    titleUC: idea?.title.toUpperCase() ?? '',
    description: idea?.description ?? '',
    level: idea?.level ?? 0,
    location: idea?.location ?? {},
    checked: idea?.checked ?? false,
  };

  const [formState, dispatch] = useReducer(reducer, initialForm);
  const { createIdea, updateIdea, deleteIdea } = useDB();
  const [onDelete, setOnDelete] = useState(false);

  const modified = getLastModified(idea?.modified.toMillis());
  const created = getLastModified(idea?.created.toMillis());

  const handleSave = () => {
    isForm ? createIdea(stackId, formState) : updateIdea(stackId, idea.id, formState);
    handleExpand(); // set to false
  };

  const handleDelete = () => {
    setOnDelete(true);
  };

  const confirmDelete = () => {
    deleteIdea(stackId, idea.id);
  };

  return (
    <>
      <AnimatePresence>
        {onDelete && <Modal handleToggle={() => setOnDelete(false)} handleDelete={confirmDelete} />}
      </AnimatePresence>
      <motion.div
        variants={variant}
        initial={'shrink'}
        animate={'expand'}
        exit={'shrink'}
        transition={{ duration: 0.5 }}
        className='relative !mb-4 overflow-hidden rounded-md bg-bg-soft-gray px-5 text-white sm:px-7'
      >
        <EnhancedFormField
          Render={Title}
          initial={formState.title}
          type='TITLE'
          isForm={isForm}
          dispatchForm={dispatch}
        />
        <EnhancedFormField
          Render={Description}
          initial={formState.description}
          type='DESCRIPTION'
          isForm={isForm}
          dispatchForm={dispatch}
        />
        <div className='mt-4 mb-1 flex-wrap items-center justify-between gap-4 sm:flex'>
          <Levels isForm={isForm} initial={formState.level} dispatchForm={dispatch} />
          <EnhancedFormField
            Render={Location}
            initial={formState.location}
            type='LOCATION'
            editable
            custom={true}
            isForm={isForm}
            dispatchForm={dispatch}
          />
        </div>
        <hr />
        <div className='mt-2 sm:flex sm:items-center sm:justify-between'>
          <div className='mt-2 mb-2 flex gap-5 text-t-md sm:mb-0 sm:mt-0 sm:text-t-lg'>
            <button
              onClick={handleSave}
              className='flex items-center gap-1 whitespace-nowrap text-green-500 hover:text-u-green'
            >
              save changes
              <Icon className='mt-1' icon='ant-design:check-outlined' />
            </button>
            <button onClick={handleExpand} className='flex items-center gap-1 text-red-500 hover:text-u-red'>
              cancel
              <Icon className='mt-1' icon='akar-icons:cross' />
            </button>
          </div>
          <div className='flex flex-wrap justify-between gap-x-5 text-[13px] font-light sm:justify-end'>
            <p>
              last modified: <span className='font-medium'>{modified}</span>
            </p>
            <p>
              created at: <span className='font-medium tracking-wide'>{created}</span>
            </p>
          </div>
        </div>
        <button onClick={handleDelete} className='absolute top-4 right-5'>
          <Icon className='h-4 w-4 text-red-600 hover:text-u-red 2xl:h-5 2xl:w-5' icon='fa6-solid:trash-can' />
        </button>
      </motion.div>
    </>
  );
}

export default Detail;
