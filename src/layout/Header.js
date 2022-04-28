import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import Button from '../utility/Button';

const pathVariant = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition:  { duration: .9, delay: .7 * i}
  })
}

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

  const handleRouteChange = () => {
    setNavOn(false);
  }

  return (
    <>
      <header>
        <div className='relative mx-auto flex w-11/12 max-w-[24rem] items-center justify-between pt-[clamp(1.3rem,5vw,4rem)] sm:max-w-[48rem] lg:max-w-[90rem]'>
          <div
            onClick={() => navigate('../')}
            className='flex cursor-pointer items-center gap-4 text-sm text-white lg:text-xl'
          >
            <motion.svg initial='hidden' animate='visible' className='w-28 sm:w-32 lg:w-36' viewBox="0 0 94 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path d="M32.0729 4.776C32.5636 4.776 33.0383 4.81867 33.4969 4.904C33.9556 4.97867 34.4089 5.12267 34.8569 5.336L34.5049 6.552C34.0463 6.33867 33.6303 6.18933 33.2569 6.104C32.8943 6.008 32.5209 5.96 32.1369 5.96C31.5289 5.96 31.0489 6.09333 30.6969 6.36C30.3449 6.62667 30.1689 7 30.1689 7.48C30.1689 7.88533 30.2969 8.21067 30.5529 8.456C30.8196 8.70133 31.2516 8.91467 31.8489 9.096L32.8569 9.416C33.7743 9.704 34.4196 10.0987 34.7929 10.6C35.1769 11.0907 35.3689 11.6453 35.3689 12.264C35.3689 12.7013 35.2783 13.1013 35.0969 13.464C34.9263 13.816 34.6809 14.12 34.3609 14.376C34.0516 14.6213 33.6836 14.8133 33.2569 14.952C32.8303 15.08 32.3609 15.144 31.8489 15.144C31.3369 15.144 30.8143 15.096 30.2809 15C29.7583 14.9147 29.2356 14.7493 28.7129 14.504L29.0649 13.304C29.5236 13.528 29.9716 13.6933 30.4089 13.8C30.8463 13.9067 31.3049 13.96 31.7849 13.96C32.3609 13.96 32.8516 13.8267 33.2569 13.56C33.6623 13.2933 33.8649 12.8987 33.8649 12.376C33.8649 12.184 33.8329 12.008 33.7689 11.848C33.7156 11.6773 33.6143 11.5173 33.4649 11.368C33.3263 11.2187 33.1343 11.08 32.8889 10.952C32.6436 10.824 32.3343 10.7013 31.9609 10.584L30.9529 10.264C30.2169 10.0293 29.6516 9.70933 29.2569 9.304C28.8623 8.89867 28.6649 8.34933 28.6649 7.656C28.6649 6.77067 28.9529 6.072 29.5289 5.56C30.1156 5.03733 30.9636 4.776 32.0729 4.776ZM37.1911 4.92H38.6631V10.952C38.6631 12.0293 38.8604 12.7973 39.2551 13.256C39.6497 13.7147 40.2844 13.944 41.1591 13.944C42.0231 13.944 42.6524 13.688 43.0471 13.176C43.4524 12.664 43.6551 11.9867 43.6551 11.144V4.92H45.1271V11.096C45.1271 12.472 44.7751 13.4907 44.0711 14.152C43.3671 14.8133 42.3964 15.144 41.1591 15.144C39.9111 15.144 38.9351 14.8187 38.2311 14.168C37.5377 13.5067 37.1911 12.456 37.1911 11.016V4.92ZM54.1454 4.92V6.168H50.9934V15H49.5214V6.168H46.4334V4.92H54.1454ZM57.2601 4.92H58.5721L62.5881 15H61.0521L59.9481 12.2H55.8041L54.7161 15H53.1961L57.2601 4.92ZM56.2041 11.032H59.5161L58.8441 9.288C58.6627 8.82933 58.4974 8.38667 58.3481 7.96C58.1987 7.53333 58.0494 7.096 57.9001 6.648H57.8681C57.7187 7.096 57.5641 7.528 57.4041 7.944C57.2441 8.36 57.0734 8.808 56.8921 9.288L56.2041 11.032ZM63.8816 15V4.92H65.3536V9.48L69.5936 4.92H71.4176L67.2576 9.384L71.7376 15H69.8816L66.2016 10.392L65.3536 11.304V15H63.8816ZM73.1003 15V4.92H74.5723V9.48L78.8123 4.92H80.6363L76.4763 9.384L80.9563 15H79.1003L75.4203 10.392L74.5723 11.304V15H73.1003ZM81.9567 4.92H83.4287V10.952C83.4287 12.0293 83.626 12.7973 84.0207 13.256C84.4154 13.7147 85.05 13.944 85.9247 13.944C86.7887 13.944 87.418 13.688 87.8127 13.176C88.218 12.664 88.4207 11.9867 88.4207 11.144V4.92H89.8927V11.096C89.8927 12.472 89.5407 13.4907 88.8367 14.152C88.1327 14.8133 87.162 15.144 85.9247 15.144C84.6767 15.144 83.7007 14.8187 82.9967 14.168C82.3034 13.5067 81.9567 12.456 81.9567 11.016V4.92Z" fill="white"/>
                <motion.path variants={pathVariant} custom={0} d="M1.24853 5.95376L9.19853 0.828731C9.53003 0.615031 9.96338 0.610193 10.3 0.816436L18.6656 5.94119C19.2844 6.32024 19.276 7.18438 18.65 7.55252L10.2841 12.4725C9.95493 12.6661 9.53813 12.6615 9.21378 12.4608L1.2642 7.541C0.664164 7.16966 0.655929 6.33576 1.24853 5.95376Z" stroke="white"/>
                <motion.path variants={pathVariant} custom={1} d="M1.24853 9.17006L9.19853 4.04504C9.53003 3.83134 9.96338 3.8265 10.3 4.03274L18.6656 9.15749C19.2844 9.53654 19.276 10.4007 18.65 10.7688L10.2841 15.6888C9.95493 15.8824 9.53813 15.8778 9.21378 15.6771L1.2642 10.7573C0.664164 10.386 0.655929 9.55206 1.24853 9.17006Z" stroke="white"/>
                <motion.path variants={pathVariant} custom={2} d="M1.24853 12.6881L9.19853 7.56309C9.53003 7.34942 9.96338 7.34456 10.3 7.5508L18.6656 12.6756C19.2844 13.0546 19.276 13.9188 18.65 14.2869L10.2841 19.2069C9.95493 19.4004 9.53813 19.3958 9.21378 19.1951L1.2642 14.2754C0.664164 13.904 0.655929 13.0701 1.24853 12.6881Z" stroke="white"/>
            </motion.svg>
          </div>
          {loggedIn && (
            <nav>
              <ul className='hidden sm:flex sm:items-center sm:gap-x-4 md:gap-x-6'>
                <li>
                  <Button onClick={() => navigate(`../u/${userInfo?.name}`)}>
                    Profile
                    <img className='w-5 h-5 rounded-md' src={userInfo?.photoURL} alt={userInfo.username} />
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
                } absolute top-[clamp(4rem,20vw,6rem)] left-0 z-10 flex w-full origin-top flex-col rounded-md bg-bg-soft-gray text-center text-white shadow-md duration-300 sm:static sm:hidden sm:text-black`}
              >
                <li onClick={handleRouteChange}>
                  <NavLink
                    className='inline-block text-lg w-full border-b-[1px] py-[max(2vw,.5rem)] active:bg-black'
                    to={`../u/${userInfo?.name}`}
                  >
                    profile
                  </NavLink>
                </li>
                <li  onClick={handleRouteChange}>
                  <button className='w-full py-[max(2vw,.5rem)] text-lg active:bg-black' onClick={handleSingOut}>
                    log out
                  </button>
                </li>
              </ul>
              <button className='sm:hidden' onClick={() => setNavOn((prev) => !prev)}>
                <Icon
                  className='h-7 w-7 text-white'
                  icon={navOn ? 'akar-icons:cross' : 'pepicons:menu'}
                />
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
