import { Icon } from '@iconify/react';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import useGithub from '../custom-hook/useGithub';
import { getMMDDYY, getLastModified } from '../utility/datetime';
import Wrapper from '../utility/Wrapper';

function Profile() {
  const { avatar_url, login: username, name, bio, followers, following } = useGithub();
  const {
    userInfo: { stackCount, ideaCount, modified },
  } = useDB();

  const { user } = useAuth();

  return (
    <main className='mt-[5vw] md:flex md:justify-between gap-8'>
      <Wrapper className='w-80 p-6 text-white'>
        <div>
          <img className='rounded-md' src={avatar_url} alt={username} />
        </div>
        <h1 className='mt-8 font-open-sans lg:text-t-xl'> {name} </h1>
        <h2 className='font-open-sans font-medium text-gray-300'> lyn-eva </h2>
        <h3 className='font-ro mt-2'> {bio}</h3>
        <div className='mt-6 flex items-center font-roboto'>
          <Icon className='h-6 w-6' icon='fluent:people-20-regular' />
          <p className='ml-4 mr-[20%]'>
            <span className='font-semibold text-blue-500'>{followers}</span> followers
          </p>
          <p>
            <span className='font-semibold text-blue-500'>{following}</span> following
          </p>
        </div>
      </Wrapper>
      <Wrapper className='w-8/12 self-start p-7'>
        <div className='flex justify-between text-blue-500 tracking-wider'>
          <div>
            <p>
              <span className='font-open-sans font-semibold tracking-wide text-white mr-2'>joined :</span>
              {getMMDDYY(user?.metadata.createdAt)}
            </p>
            <p className='mt-4'>
              <span className='font-open-sans font-semibold tracking-wide text-white mr-2'>last logged in :</span>
              {getLastModified(user?.metadata.lastLoginAt)}
            </p>
            <p className='mt-4'>
              <span className='font-open-sans font-semibold tracking-wide text-white mr-2'>last modified :</span>
              {getLastModified(modified?.toMillis())}
            </p>
          </div>
          <div>
            <p>
              <span className='font-open-sans font-semibold tracking-wide text-white mr-2'>number of stacks :</span>
              {stackCount ?? 0}
            </p>
            <p className='mt-4'>
              <span className='font-open-sans font-semibold tracking-wide text-white mr-2'>number of ideas :</span>
              {ideaCount ?? 0}
            </p>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default Profile;
