import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../context/authProvider";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import { Icon } from "@iconify/react";

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
    <motion.main
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      className="flex grow items-center overflow-hidden bg-logo-watermark bg-[length:400px] bg-[right_center] bg-no-repeat py-10 sm:mb-10"
    >
      <section>
        <motion.h1
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gradient font-open-sans text-t-2xl font-bold sm:text-t-3xl lg:text-5xl"
        >
          NEVER FORGET TO REFACTOR YOUR CODE
        </motion.h1>
        <motion.h2
          initial="initial"
          animate="animate"
          variants={middle}
          className="mt-8 font-roboto text-t-ultra font-normal leading-7 tracking-wide text-white sm:mt-12 sm:w-3/4 sm:text-t-xl lg:w-2/3 lg:text-2xl lg:font-medium lg:leading-9"
        >
          Have you ever been in a situation where you got an idea to refactor a certain
          piece of code from an old repository which is not worth a commit? <br />
          The next day you woke up and forgot that awesome idea. <br />
          It’s not too good. RIGHT?
        </motion.h2>
        <motion.h3
          initial="initial"
          animate="animate"
          variants={middle}
          className="mt-4 font-roboto text-t-lg font-normal text-text-gray sm:mt-6 sm:w-8/12 sm:text-t-ultra lg:w-1/2 lg:text-xl lg:font-medium"
        >
          Stack trys to solve this. It let you keep your idea you might want to do for
          each repository.
        </motion.h3>
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 items-center gap-6 sm:mt-16 sm:flex lg:mt-24"
        >
          <motion.p className="text-gradient bg-gradient-to-b font-roboto text-xl font-medium">
            Start from today
          </motion.p>
          <div className="mt-4 sm:mt-0">
            <motion.span
              animate={{ x: [5, -5, 5] }}
              transition={{ repeat: Infinity, repeatDelay: 0.3, duration: 1 }}
              className="mr-6 inline-block"
            >
              <Icon icon="bi:arrow-right" width={26} style={{ color: "#fff" }} />
            </motion.span>
            <Button onClick={handleGithubSignIn}>
              <Icon icon="akar-icons:github-fill" style={{ marginRight: "1rem" }} />
              Login with GITHUB
            </Button>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}

export default Welcome;
