import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../context/authProvider';
import { useDB } from '../context/dbProvider';
import Button from '../utility/Button';
import { Icon } from '@iconify/react';
import ScaleLoading from '../utility/ScaleLoading';

const middle = {
  initial: { y: 500 },
  animate: { y: 0, transition: { duration: 0.7 } },
};

function Welcome() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState('unknown');
  const { createUser } = useDB();
  const { auth, PopupSignIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) navigate('home');
      setIsLoggedIn(user);
    });
    return unsub;
  }, [auth, navigate]);

  const handleGithubSignIn = async () => {
    setLoading(true);
    const result = await PopupSignIn();
    await createUser(result);
    setLoading(false);
  };

  return (isLoggedIn === 'unknown' || loading) ? <><ScaleLoading /><p className='fixed top-[calc(50%+1.5rem)] left-1/2 -translate-x-1/2 text-gray-200'>authenticating</p></>  : (
    <motion.main
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      className='mt-[5vw] flex grow items-center overflow-hidden bg-logo-watermark bg-[length:400px] bg-center bg-no-repeat py-10 sm:mt-[max(5vw,13vh)] sm:mb-10 sm:bg-[right_5vw_center]'
    >
      <section className='mx-auto w-11/12 max-w-[24rem] sm:max-w-[48rem] lg:max-w-[90rem]'>
        <motion.h1
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-gradient font-open-sans text-t-2xl font-bold sm:text-t-3xl lg:text-5xl'
        >
          NEVER FORGET TO REFACTOR YOUR CODE
        </motion.h1>
        <motion.h2
          initial='initial'
          animate='animate'
          variants={middle}
          className='mt-8 font-roboto text-t-ultra font-normal leading-7 tracking-wide text-white sm:mt-12 sm:w-3/4 sm:text-t-xl lg:w-2/3 lg:text-2xl lg:font-medium lg:leading-9'
        >
          Have you ever been in a situation where you got an idea to refactor a certain piece of
          code from an old repository which is not worth a commit? <br />
          The next day you woke up and forgot that awesome idea. <br />
          It’s not too good. RIGHT?
        </motion.h2>
        <motion.h3
          initial='initial'
          animate='animate'
          variants={middle}
          className='mt-4 font-roboto text-t-lg font-normal text-text-gray sm:mt-6 sm:w-8/12 sm:text-t-ultra lg:w-1/2 lg:text-xl lg:font-medium'
        >
          Stack trys to solve this. It let you keep your idea you might want to do for each
          repository.
        </motion.h3>
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className='mt-12 gap-6 sm:mt-16 sm:flex sm:items-center lg:mt-24'
        >
          <motion.p className='text-gradient bg-gradient-to-b font-roboto text-xl font-medium'>
            Start from today
          </motion.p>
          <div className='mt-4 flex items-center sm:mt-0'>
            <motion.span
              animate={{ x: [5, -5, 5] }}
              transition={{ repeat: Infinity, repeatDelay: 0.3, duration: 1 }}
              className='mr-6 inline-block'
            >
              <Icon icon='bi:arrow-right' className='h-8 w-8 text-white' />
            </motion.span>
            <Button onClick={handleGithubSignIn}>
              <Icon icon='akar-icons:github-fill' className='mr-2 lg:my-1 lg:h-5 lg:w-5' />
              Login with GITHUB
            </Button>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}

export default Welcome;
