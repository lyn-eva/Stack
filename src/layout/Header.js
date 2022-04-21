import { useNavigate, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import Button from '../utility/Button';
import logo from '../asset/logo.svg';

function Header({ loggedIn }) {
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
      <header className='flex items-center justify-between py-2'>
        <div
          onClick={() => navigate('../')}
          className='flex cursor-pointer items-center gap-4 text-sm text-white lg:text-xl'
        >
          <img className='w-24 sm:w-28' src={logo} alt='stack' />
        </div>
        {loggedIn && (
          <nav className='flex items-center gap-x-2 md:gap-x-6'>
            <NavLink to={`../u/${userInfo?.name}`}>
              <img
                className='h-9 w-9 md:h-10 md:w-10 rounded-full ring-2'
                src={userInfo?.photoURL}
                alt={userInfo?.username}
              />
            </NavLink>
            <Button onClick={handleSingOut}>
              Go to Login
              <Icon className='h-5 w-5' icon='bi:arrow-right' />
            </Button>
          </nav>
        )}
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
