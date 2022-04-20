import { motion } from "framer-motion";

function Button({ children, style, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="flex items-center bg-white py-[2px] px-4 font-roboto text-t-sm font-normal rounded-[.2em] sm:py-[4px] sm:text-t-md lg:text-t-lg"
      style={style || {}}
    >
      {children}
    </motion.button>
  );
}

export default Button;
