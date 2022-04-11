import { useRef } from "react";
import { useNavigate } from "react-router";
import { motion, animate } from "framer-motion";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

const middle = {
  initial: { y: 500 },
  animate: { y: 0, transition: { duration: 0.7 } },
};

function Welcome() {
  const { createUser } = useDB();
  const { PopupSignIn } = useAuth();
  const navigate = useNavigate();

  
  const handleGithubSignIn = async () => {
    await PopupSignIn();
    await createUser();
    navigate("../home");
  };

  return (
    <main className="flex grow items-center overflow-hidden bg-logo-watermark bg-[length:400px] bg-[right_center] bg-no-repeat py-10">
      <div>
        <motion.h1
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: .7 }}
          className="text-gradient font-open-sans text-5xl font-bold"
        >
          NEVER FORGET TO REFACTOR YOUR CODE
        </motion.h1>
        <motion.h2
          initial="initial"
          animate="animate"
          variants={middle}
          className="mt-8 w-2/3 font-roboto text-2xl font-medium leading-9 tracking-wide text-white"
          >
          Have you ever been in a situation where you got an idea to modify a certain
          piece of code which is not worth a commit? <br />
          The next day you woke up and forgot that awesome idea. <br />
          It’s not too good. RIGHT?
        </motion.h2>
        <motion.h3
          initial="initial"
          animate="animate"
          variants={middle}
          className="mt-4 w-1/2 font-roboto text-xl font-medium text-text-gray"
        >
          Stack trys to solve this. It let you take note for changes you might want to do
          for each repository.
        </motion.h3>
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: .7 }}
          className="mt-24"
        >
          <motion.span
            drag
            className="text-gradient mr-8 bg-gradient-to-b font-roboto text-xl font-medium"
          >
            Start from today
            <Iconify
              data-icon="bi:arrow-right"
              data-width={26}
              style={{ color: "#fff", marginLeft: "1.5rem" }}
            />
          </motion.span>
          <Button onClick={handleGithubSignIn}>
            <Iconify
              data-width={23}
              data-icon="akar-icons:github-fill"
              style={{ marginRight: "1rem" }}
            />
            Login with GITHUB
          </Button>
        </motion.div>
      </div>
    </main>
  );
}

export default Welcome;
