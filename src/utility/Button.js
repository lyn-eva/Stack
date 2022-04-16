import { motion, whileHover } from "framer-motion";

function Button({ children, style, onClick }) {
  return (
    <motion.button
      whileHover={{scale: 1.03}}
      onClick={onClick}
      className="text-sm py-1 rounded-md bg-white px-4 lg:py-[6px] font-roboto font-medium"
      style={style || {}}
    >
      {children}
    </motion.button>
  );
}

export default Button;
