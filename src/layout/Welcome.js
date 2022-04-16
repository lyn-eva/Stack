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
    <motion.main initial={{opacity: 0}} transition={{duration: 1}} animate={{opacity: 1}} className="sm:mb-10 flex grow items-center overflow-hidden bg-logo-watermark bg-[length:400px] bg-[right_center] bg-no-repeat py-10">
      <section>
        <motion.h1
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-t-2xl sm:text-t-3xl text-gradient font-open-sans lg:text-5xl font-bold"
        >
          NEVER FORGET TO REFACTOR YOUR CODE
        </motion.h1>
        <motion.h2
          initial="initial"
          animate="animate"
          variants={middle}
          className="text-t-ultra sm:text-t-xl leading-7 font-normal mt-8 sm:mt-12 sm:w-3/4 lg:w-2/3 font-roboto lg:text-2xl lg:font-medium lg:leading-9 tracking-wide text-white"
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
          className="text-t-lg sm:text-t-ultra font-normal mt-4 sm:mt-6 sm:w-8/12 lg:w-1/2 font-roboto lg:text-xl lg:font-medium text-text-gray"
        >
          Stack trys to solve this. It let you keep your idea you might want to do
          for each repository.
        </motion.h3>
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 sm:mt-16 lg:mt-24 sm:flex items-center gap-6"
        >
          <motion.p className="text-gradient bg-gradient-to-b font-roboto text-xl font-medium">
            Start from today
          </motion.p>
          <div className='mt-4 sm:mt-0'>
            <motion.span animate={{ x: [5, -5, 5] }} transition={{ repeat: Infinity, repeatDelay: .3, duration: 1 }} className='inline-block mr-6'>
              <Iconify
                data-icon="bi:arrow-right"
                data-width={26}
                style={{ color: "#fff" }}
              />
            </motion.span>
            <Button onClick={handleGithubSignIn}>
              <Iconify
                data-icon="akar-icons:github-fill"
                style={{ marginRight: "1rem" }}
              />
              Login with GITHUB
            </Button>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}

export default Welcome;
