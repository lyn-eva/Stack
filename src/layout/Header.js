import { useNavigate } from "react-router";
import { useAuth } from "../context/authProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

function Header({ loggedIn }) {
  const { SignOut } = useAuth();
  const navigate = useNavigate();

  const handleSingOut = async() => {
    await SignOut();
    navigate('../');
  }

  return (
    <>
      <header className="flex items-center justify-between py-2">
        <div className="text-white text-xl flex items-center gap-4">
          <svg
            width="40"
            height="42"
            viewBox="0 0 40 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.4971 12.5024L18.3971 1.73984C19.0601 1.29107 19.9268 1.28091 20.6001 1.71402L37.3313 12.476C38.5688 13.272 38.5521 15.0867 37.3001 15.8598L20.5682 26.1918C19.9099 26.5983 19.0763 26.5886 18.4276 26.1671L2.52844 15.8356C1.32836 15.0558 1.31189 13.3046 2.4971 12.5024Z"
              stroke="white"
            />
            <path
              d="M2.4971 19.257L18.3971 8.49445C19.0601 8.04568 19.9268 8.03552 20.6001 8.46862L37.3313 19.2306C38.5688 20.0266 38.5521 21.8413 37.3001 22.6144L20.5682 32.9464C19.9099 33.3529 19.0763 33.3433 18.4276 32.9217L2.52844 22.5902C1.32836 21.8104 1.31189 20.0592 2.4971 19.257Z"
              stroke="white"
            />
            <path
              d="M2.4971 26.6448L18.3971 15.8823C19.0601 15.4336 19.9268 15.4234 20.6001 15.8565L37.3313 26.6185C38.5688 27.4145 38.5521 29.2292 37.3001 30.0023L20.5682 40.3343C19.9099 40.7407 19.0763 40.7311 18.4276 40.3096L2.52844 29.9781C1.32836 29.1983 1.31189 27.4471 2.4971 26.6448Z"
              stroke="white"
            />
          </svg>
          Stack
        </div>
        {loggedIn && (
          <Button onClick={handleSingOut}>
            Go to Login{" "}
            <Iconify data-width={20} data-icon="bi:arrow-right-short"></Iconify>
          </Button>
        )}
      </header>
      {loggedIn && (
        <section className="my-8 mb-12 font-open-sans text-5xl text-center text-gradient">
          Good Evening, Naomi!!
        </section>
      )}
    </>
  );
}

export default Header;
