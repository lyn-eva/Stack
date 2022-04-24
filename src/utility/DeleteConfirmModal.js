import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
const DeleteConfirmModal = ({ username, handleToggle, handleDelete }) => {
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();

  const proceedDeletion = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== username) return setIsValid(false);
    setIsValid(true);
    handleDelete();
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className='fixed top-0 left-0 z-10 h-screen w-screen bg-black opacity-30'
      ></div>
      <motion.div
        initial={{ scale: 0, translateY: '-50%', translateX: '-55%' }}
        animate={{ scale: 1, translateY: '-50%', translateX: '-55%' }}
        exit={{ scale: 0, translateY: '-50%', translateX: '-55%' }}
        transition={{ duration: 0.3 }}
        className='fixed top-1/2 left-1/2 z-20 mx-4 w-11/12 max-w-[15rem] sm:max-w-[20rem] rounded-md bg-white px-6 py-4 text-black sm:px-12 sm:py-8'
      >
        Please type <span className='font-bold text-blue-500'>{username}</span> to delete your
        account.
        <form onSubmit={proceedDeletion}>
          <input
            ref={inputRef}
            type='text'
            className='mt-3 block w-full rounded pl-1 outline outline-2 outline-blue-400'
          />
          {isValid || <span className='text-t-md'>username are not match</span>}
          <div className='mt-5 flex justify-between gap-4 text-white'>
            <Button
              type='submit'
              style={{ backgroundColor: '#f00', fontSize: 15, padding: '4px 10px' }}
            >
              Delete
            </Button>
            <Button
              onClick={handleToggle}
              style={{ backgroundColor: '#00f', fontSize: 15, padding: '4px 10px' }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default DeleteConfirmModal;
