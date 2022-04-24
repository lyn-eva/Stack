import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import Button from '../utility/Button';
import logo from '../asset/logo.svg';

function Header({ loggedIn }) {
  const [navOn, setNavOn] = useState(false);
  const { SignOut } = useAuth();
  const { userInfo } = useDB();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSingOut = async () => {
    await SignOut();
    navigate('../');
  };

  return (
    <>
      <header className='relative'>
        <div className='mx-auto flex w-11/12 max-w-[24rem] items-center justify-between pt-[clamp(1.3rem,5vw,4rem)] sm:max-w-[48rem] lg:max-w-[90rem]'>
          <div
            onClick={() => navigate('../')}
            className='flex cursor-pointer items-center gap-4 text-sm text-white lg:text-xl'
          >
            <img className='w-24 sm:w-28' src={logo} alt='stack' />
          </div>
          {loggedIn && (
            <nav>
              <ul className='hidden sm:flex sm:items-center sm:gap-x-4 md:gap-x-6'>
                <li>
                  <Button onClick={() => navigate(`../u/${userInfo?.name}`)}>
                    Profile
                    <Icon className='w-6 h-6' icon="carbon:user-avatar-filled-alt" />
                  </Button>
                </li>
                <li className='hidden sm:block'>
                  <Button onClick={handleSingOut}>
                    Go to Login
                    <Icon className='h-5 w-5' icon='bi:arrow-right' />
                  </Button>
                </li>
              </ul>
              <ul
                className={`${
                  navOn ? 'scale-y-100' : 'scale-y-0'
                } duration-300 origin-top absolute top-[clamp(4rem,20vw,6rem)] left-0 z-10 flex w-full flex-col rounded-sm bg-bg-soft-gray text-center text-white shadow-md sm:static sm:hidden sm:text-black`}
              >
                <li className='border-b-[1px] py-[2vw]'>
                  <NavLink to={`../u/${userInfo?.name}`}>profile</NavLink>
                </li>
                <li className='py-[2vw]'>
                  <button onClick={handleSingOut}>login</button>
                </li>
              </ul>
              <button className='sm:hidden' onClick={() => setNavOn(prev => !prev)}>
                <Icon className='h-7 w-7 text-white' icon='pepicons:menu' />
              </button>
            </nav>
          )}
        </div>
      </header>
      {loggedIn && /\/home$/.test(location.pathname) && (
        <section className='text-gradient my-6 text-center font-open-sans text-2xl sm:my-8 sm:mb-10 sm:text-3xl lg:my-8 lg:mb-12 lg:text-5xl'>
          Good Evening, {userInfo?.name}
        </section>
      )}
    </>
  );
}

export default Header;
