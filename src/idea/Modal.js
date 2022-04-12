import { motion, animate, whileTap } from "framer-motion";
import Button from "../utility/Button";
const Modal = () => {
  return (
    <motion.div
      whileTap={{ scale: 0 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-12 py-8"
    >
      Are you sure to delete
      <div className='text-white flex gap-6 mt-5'>
        <Button style={{backgroundColor: '#f00'}}>Delete</Button>
        <Button style={{backgroundColor: '#00f'}}>Cancel</Button>
      </div>
    </motion.div>
  );
};

export default Modal;
