import { motion } from "framer-motion";

function Button({ children, style, onClick }) {
  return (
    <motion.button
      whileHover={{scale: 1.03}}
      onClick={onClick}
      className="text-t-sm sm:text-t-md py-[2px] lg:text-t-lg rounded-sm sm:rounded-md bg-white px-4 sm:py-[4px] font-roboto font-medium"
      style={style || {}}
    >
      {children}
    </motion.button>
  );
}

export default Button;
