import { motion } from 'framer-motion';

function Button({ children, style, onClick, type = 'button', className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      type={type}
      className='flex items-center gap-2 rounded-[.2em] bg-white py-[4px] px-2 font-roboto text-t-md font-normal sm:py-[5px] sm:text-t-md md:px-4 lg:text-t-lg'
      style={style || {}}
    >
      {children}
    </motion.button>
  );
}

export default Button;
