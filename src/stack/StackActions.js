import { useReducer } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useDB } from '../context/dbProvider';
import useRepo from '../custom-hook/useRepo';
import Button from '../utility/Button';
import { Icon } from '@iconify/react';
import Modal from '../utility/Modal';

const iconifyStyle = { width: '14', style: { marginLeft: '.5rem' } };

const btnStyle = {
  padding: '.05em 8px',
  borderRadius: '.2em',
  letterSpacing: '0px',
};

const variant = {
  shrink: { scaleY: 0, opacity: 0, zIndex: -50, originY: 0 },
  expand: { scaleY: 1, opacity: 1, zIndex: 20, originY: 0 },
};

const SORT_OPTIONS = [
  { value: 'level', option: 'level' },
  { value: 'created', option: 'created' },
  { value: 'titleUC', option: 'title' },
];
const FILTER_OPTIONS = [
  { value: { key: 'level', value: 2 }, option: 'urgent' },
  { value: { key: 'level', value: 1 }, option: 'moderate' },
  { value: { key: 'level', value: 0 }, option: 'trival' },
  { value: { key: 'checked', value: true }, option: 'completed' },
  { value: { key: 'checked', value: false }, option: 'remove filter' },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'SORT':
      return { ...state, filterIsActive: false, sortIsActive: !state.sortIsActive };
    case 'FILTER':
      return { ...state, sortIsActive: false, filterIsActive: !state.filterIsActive };
    case 'DELETE':
      return { ...state, deleteIsActive: !state.deleteIsActive };
    default:
      return state;
  }
};

function StackActions({ stackId, setAddIdea, dispatch }) {
  const [toggleStates, dispatchToggle] = useReducer(reducer, {});
  const navigate = useNavigate();
  const { deleteStack } = useDB();
  // const { repoUrl } = useRepo(); //

  const handleDelete = async () => {
    await deleteStack(stackId);
    navigate(-1);
  };

  const handleDispatch = (type, value) => {
    return () => {
      dispatch({ type: type, value: value });
    };
  };

  return (
    <>
      <ul id='stack-actions' className='mb-6 mt-4 flex flex-wrap gap-1 sm:mb-8 sm:gap-4'>
        <li className='shrink-0'>
          <a
            target='_blank'
            rel='noreferrer'
            href=''
            className='flex items-center bg-white font-roboto text-t-sm font-normal sm:text-t-md lg:text-t-lg'
            style={btnStyle}
          >
            go to repo
            <Icon icon='ri:git-repository-line' {...iconifyStyle} />
          </a>
        </li>
        <li className='shrink-0'>
          <Button onClick={() => setAddIdea((prev) => !prev)} style={btnStyle}>
            new idea
            <Icon icon='ant-design:plus-outlined' {...iconifyStyle} />
          </Button>
        </li>
        <li className='relative shrink-0'>
          <Button onClick={() => dispatchToggle({ type: 'FILTER' })} style={btnStyle}>
            filter
            <Icon icon='bytesize:filter' {...iconifyStyle} />
          </Button>
          <motion.ul
            variants={variant}
            initial='shrink'
            animate={toggleStates.filterIsActive ? 'expand' : 'shrink'}
            onClick={() => dispatchToggle({ type: 'FILTER' })}
            className='absolute top-8 whitespace-nowrap rounded-sm bg-white py-1  shadow-md'
          >
            {FILTER_OPTIONS.map(({ option, value }) => (
              <li
                onClick={handleDispatch('FILTER', value)}
                key={option}
                tabIndex='1'
                className='stack-dropdown'
              >
                {option}
              </li>
            ))}
          </motion.ul>
        </li>
        <li className='relative shrink-0'>
          <Button onClick={() => dispatchToggle({ type: 'SORT' })} style={btnStyle}>
            sort
            <Icon icon='cil:sort-descending' {...iconifyStyle} />
          </Button>
          <motion.ul
            variants={variant}
            initial='shrink'
            animate={toggleStates.sortIsActive ? 'expand' : 'shrink'}
            onClick={() => dispatchToggle({ type: 'SORT' })}
            className='absolute top-8 rounded-sm bg-white py-1 shadow-md'
          >
            {SORT_OPTIONS.map(({ option, value }) => (
              <li
                onClick={handleDispatch('SORT', value)}
                key={option}
                tabIndex='1'
                className='stack-dropdown'
              >
                {option}
              </li>
            ))}
          </motion.ul>
        </li>
        <li className='shrink-0  sm:ml-auto'>
          <Button
            onClick={() => dispatchToggle({ type: 'DELETE' })}
            style={{ ...btnStyle, backgroundColor: '#f00', color: '#fff' }}
          >
            <span className='hidden sm:inline'>Delete</span>
            <Icon className='my-[3px] sm:ml-1' icon='ion:trash-outline' />
          </Button>
        </li>
      </ul>
      <AnimatePresence>
        {toggleStates.deleteIsActive && (
          <Modal
            handleDelete={handleDelete}
            handleToggle={() => dispatchToggle({ type: 'DELETE' })}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default StackActions;
