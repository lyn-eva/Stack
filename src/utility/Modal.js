import { motion } from 'framer-motion';
import Button from './Button';
const Modal = ({ handleToggle, handleDelete }) => {
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
        className='fixed top-1/2 left-1/2 z-20 mx-4 w-8/12 max-w-[15rem] sm:max-w-[20rem] rounded-md bg-white px-6 py-4 text-black sm:px-12 sm:py-8'
      >
        Are you sure to delete?
        <div className='mt-8 flex justify-between gap-4 text-white'>
          <Button
            onClick={handleDelete}
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
      </motion.div>
    </>
  );
};

export default Modal;
