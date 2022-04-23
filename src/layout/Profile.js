import { Icon } from '@iconify/react';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import useGithub from '../custom-hook/useGithub';
import { getMMDDYY, getLastModified } from '../utility/datetime';
import Wrapper from '../utility/Wrapper';
import Button from '../utility/Button';

function Profile() {
  const { avatar_url, login: username, name, bio, followers, following } = useGithub();
  const {
    deleteUser,
    userInfo: { stackCount, ideaCount, modified },
  } = useDB();

  const { user } = useAuth();

  const handleAccDeletion = () => {
    console.log(deleteUser);
  };

  return (
    <main className='mt-[5vw] mb-10 gap-8 lg:flex lg:justify-between lg:w-10/12 lg:mx-auto'>
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
      <section className='mt-4 self-start lg:w-7/12 lg:mt-0'>
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
                {getLastModified(modified?.toMillis())}
              </p>
            </div>
            <div className='mt-4 sm:mt-0'>
              <p>
                <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                  number of stacks :
                </span>
                {stackCount ?? 0}
              </p>
              <p className='mt-4'>
                <span className='mr-2 font-open-sans font-semibold tracking-wide text-white'>
                  number of ideas :
                </span>
                {ideaCount ?? 0}
              </p>
            </div>
          </div>
        </Wrapper>
        <div className='mt-3 flex justify-end'>
          <Button onClick={handleAccDeletion} style={{ backgroundColor: '#f00', color: '#fff' }}>
            Delete Account
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
