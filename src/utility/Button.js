import { motion } from "framer-motion";

function Button({ children, style, onClick, type= 'button', className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      type={type}
      className='flex items-center gap-2 bg-white py-[3px] px-2 md:px-4 font-roboto text-t-sm font-normal rounded-[.2em] sm:py-[4px] sm:text-t-md lg:text-t-lg'
      style={style || {}}
    >
      {children}
    </motion.button>
  );
}

export default Button;
