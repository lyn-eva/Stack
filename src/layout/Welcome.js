import { useNavigate } from "react-router";
import { useAuth } from "../context/authProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

function Welcome() {
  const { PopupSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGithubSignIn = async () => {
    await PopupSignIn();
    navigate("../home");
  };

  return (
    <main className="py-10 bg-logo-watermark bg-no-repeat bg-[right_center] bg-[length:400px] grow flex items-center">
      <div>
        <h1 className="font-open-sans font-bold text-5xl text-gradient">
          NEVER FORGET TO REFACTOR YOUR CODE
        </h1>
        <h2 className="font-roboto font-medium text-2xl text-white tracking-wide leading-9 mt-8 w-2/3">
          Have you ever been in a situation where you got an idea to modify a certain
          piece of code which is not worth a commit? <br />
          The next day you woke up and forgot that awesome idea. <br />
          It’s not too good. RIGHT?
        </h2>
        <h3 className="font-roboto font-medium text-xl text-text-gray w-1/2 mt-4">
          Stack trys to solve this. It let you take note for changes you might want to do
          for each repository.
        </h3>
        <div className="mt-24">
          <span className="text-xl text-gradient bg-gradient-to-b font-roboto font-medium mr-8">
            Start from today
            <Iconify
              data-icon="bi:arrow-right"
              data-width={26}
              style={{ color: "#fff", marginLeft: "1.5rem" }}
            />
          </span>
          <Button onClick={handleGithubSignIn}>
            <Iconify
              data-width={23}
              data-icon="akar-icons:github-fill"
              style={{ marginRight: "1rem" }}
            />
            Login with GITHUB
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Welcome;
