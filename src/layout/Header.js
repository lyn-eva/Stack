import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/authProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import logo from "../asset/logo.svg"

function Header({ loggedIn }) {
  const { SignOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSingOut = async() => {
    await SignOut();
    navigate('../');
  }

  return (
    <>
      <header className="flex items-center justify-between py-2">
        <div onClick={() => navigate('../')} className="text-sm cursor-pointer text-white lg:text-xl flex items-center gap-4">
          <img className='w-24 sm:w-28' src={logo} alt='stack'/>
        </div>
        {loggedIn && (
          <Button onClick={handleSingOut}>
            Go to Login{" "}
            <Iconify data-width={20} data-icon="bi:arrow-right-short" />
          </Button>
        )}
      </header>
      {loggedIn && /\/home$/.test(location.pathname) && (
        <section className="text-2xl sm:text-3xl my-6 sm:my-8 sm:mb-10 lg:my-8 lg:mb-12 font-open-sans lg:text-5xl text-center text-gradient">
          Good Evening, Naomi!!
        </section>
      )}
    </>
  );
}

export default Header;
