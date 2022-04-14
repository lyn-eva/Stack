import { motion } from "framer-motion";
import Button from "./Button";
const Modal = ({ handleToggle, handleDelete }) => {
  return (
    <>
      <div
        onClick={handleToggle}
        className="fixed top-0 left-0 z-10 h-screen w-screen bg-black opacity-30"
      ></div>
        <motion.div
          initial={{ scale: 0, translateY: "-50%", translateX: "-50%" }}
          animate={{ scale: 1, translateY: "-50%", translateX: "-50%" }}
          exit={{ scale: 0, translateY: "-50%", translateX: "-50%" }}
          transition={{ duration: 0.3 }}
          key="modal"
          className="fixed top-1/2 left-1/2 z-20 rounded-md bg-white px-12 py-8 text-black"
        >
          Are you sure to delete?
          <div className="mt-5 flex gap-6 text-white">
            <Button onClick={handleDelete} style={{ backgroundColor: "#f00" }}>Delete</Button>
            <Button onClick={handleToggle} style={{ backgroundColor: "#00f" }}>
              Cancel
            </Button>
          </div>
        </motion.div>
    </>
  );
};

export default Modal;
