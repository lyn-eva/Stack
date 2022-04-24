import { useReducer } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import useGithub from '../custom-hook/useGithub';
import { getMMDDYY, getLastModified } from '../utility/datetime';
import Wrapper from '../utility/Wrapper';
import Button from '../utility/Button';
import Modal from '../utility/Modal';
import DeleteConfirmModal from '../utility/DeleteConfirmModal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'PROMPT':
      return { confirm: false, prompt: action.value };
    case 'CONFIRM':
      return { prompt: false, confirm: action.value };
    default:
      return state;
  }
};

function Profile() {
  const [deletionState, dispatch] = useReducer(reducer, {});
  const { avatar_url, login: username, name, bio, followers, following } = useGithub();
  const { deleteUserDb, userInfo } = useDB();

  const { user, DeleteUserAcc } = useAuth();

  const navigate = useNavigate();
  const handleAccDeletion = async () => {
    // no async
    await deleteUserDb();
    await DeleteUserAcc();
    navigate('../../login');
  };

  return (
    <main className='mt-[max(2rem,5vw)] mb-10 gap-8'>
      <AnimatePresence>
        {deletionState.prompt && (
          <Modal
            handleToggle={() => dispatch({ type: 'PROMPT', value: false })}
            handleDelete={() => dispatch({ type: 'CONFIRM', value: true })}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deletionState.confirm && (
          <DeleteConfirmModal
            username={username}
            handleToggle={() => dispatch({ type: 'CONFIRM', value: false })}
            handleDelete={handleAccDeletion}
          />
        )}
      </AnimatePresence>
      <section className='mx-auto w-11/12 max-w-[24rem] sm:max-w-[48rem] lg:mx-auto lg:flex lg:w-9/12 lg:max-w-[90rem] lg:justify-between'>
        <Wrapper className='p-4 text-white sm:flex sm:items-center sm:justify-between sm:gap-x-4 sm:p-6 lg:block lg:w-80'>
          <div className='sm:w-1/2 sm:max-w-[12rem] md:max-w-[15rem] lg:w-full lg:max-w-none'>
            <img className='w-full rounded-md' src={avatar_url} alt={username} />
          </div>
          <div className='mt-8 sm:mt-0 sm:w-1/2 lg:w-full'>
            <h1 className='font-open-sans text-t-ultra sm:lg:text-t-xl'> {name} </h1>
            <h2 className='mb-1 font-open-sans font-medium text-gray-300'> lyn-eva </h2>
            <hr />
            <h3 className='font-ro mt-2 text-t-md sm:text-t-lg'> {bio}</h3>
            <div className='mt-3 flex items-center font-roboto text-t-md sm:mt-6 sm:text-t-lg'>
              <Icon className='h-5 w-5 sm:h-6 sm:w-6' icon='fluent:people-20-regular' />
              <p className='ml-3 mr-[10%] sm:ml-4 sm:mr-[15%]'>
                <span className='font-semibold text-blue-500'>{followers}</span> followers
              </p>
              <p>
                <span className='font-semibold text-blue-500'>{following}</span> following
              </p>
            </div>
          </div>
        </Wrapper>
        <section className='mt-4 self-start lg:mt-0 lg:w-7/12'>
          <Wrapper className='p-4 sm:p-6'>
            <div className='text-t-md tracking-wider text-blue-500 sm:flex sm:justify-between sm:text-t-lg'>
              <div>
                <p>
                  <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                    joined :
                  </span>
                  {getMMDDYY(user?.metadata.createdAt)}
                </p>
                <p className='mt-4'>
                  <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                    last logged in :
                  </span>
                  {getLastModified(user?.metadata.lastLoginAt)}
                </p>
                <p className='mt-4'>
                  <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                    last modified :
                  </span>
                  {getLastModified(userInfo?.modified?.toMillis())}
                </p>
              </div>
              <div className='mt-4 sm:mt-0'>
                <p>
                  <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                    number of stacks :
                  </span>
                  {userInfo?.stackCount ?? 0}
                </p>
                <p className='mt-4'>
                  <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                    number of ideas :
                  </span>
                  {userInfo?.ideaCount ?? 0}
                </p>
              </div>
            </div>
          </Wrapper>
          <div className='mt-3 flex justify-end'>
            <Button
              onClick={() => dispatch({ type: 'PROMPT', value: true })}
              style={{ backgroundColor: '#f00', color: '#fff' }}
            >
              Delete Account
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Profile;
