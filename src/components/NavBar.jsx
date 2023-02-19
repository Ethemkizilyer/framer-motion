import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../auth";
import { clearUser, setUser } from "../features/authSlice";

const NavBar = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const dispatch = useDispatch();
  const handleClick = (page) => {
    setActive(page);
  };
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-[72px] flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/what-we-do" className="flex items-center">
          What We Do
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/statistics" className="flex items-center">
          GAMI Statistics
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/contact" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
    </ul>
  );

  const logOut = () => {
    dispatch(clearUser());
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <div>
      <div className="w-full px-8 mx-auto bg-white  flex items-center justify-between text-blue-gray-900  border-b h-[64px]   fixed z-10">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <div className="flex lg:mt-4 ">
            <Link
              to="/"
              className="flex items-center lg:mb-4 mb-0 pl-4 sm:mb-0"
            >
              <svg
                width="36"
                height="46"
                viewBox="0 0 36 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.9046 24.2877V28.5234C23.9046 28.9568 23.555 29.3074 23.1228 29.3074H12.8755C12.4432 29.3074 12.0936 28.9568 12.0936 28.5234V24.2877C12.0936 23.8543 11.7439 23.5037 11.3117 23.5037H7.08711C6.65485 23.5037 6.30521 23.1531 6.30521 22.7197V6.58574C6.30521 6.15234 6.65485 5.80177 7.08711 5.80177H11.3117C11.7439 5.80177 12.0936 5.4512 12.0936 5.0178V0.783971C12.0936 0.350572 12.4432 0 12.8755 0H23.1228C23.555 0 23.9046 0.350572 23.9046 0.783971V5.37222C23.9046 5.80562 23.555 6.15619 23.1228 6.15619H13.1675C12.7352 6.15619 12.3856 6.50676 12.3856 6.94016V22.3692C12.3856 22.8026 12.7352 23.1531 13.1675 23.1531H22.8288C23.2611 23.1531 23.6107 22.8026 23.6107 22.3692V18.484C23.6107 18.0506 23.2611 17.7 22.8288 17.7H18.6043C18.172 17.7 17.8224 17.3494 17.8224 16.916V12.3856C17.8224 11.9522 18.172 11.6016 18.6043 11.6016H28.9092C29.3414 11.6016 29.6911 11.9522 29.6911 12.3856V22.7178C29.6911 23.1512 29.3414 23.5018 28.9092 23.5018H24.6846C24.2524 23.5018 23.9027 23.8524 23.9027 24.2858L23.9046 24.2877Z"
                  fill="#1C325B"
                />
                <path
                  d="M1.8462 39.2602V44.1354H6.70857V42.8449H4.84892V40.9803H8.57975V44.2298C8.57975 45.2103 7.78056 45.9981 6.80463 45.9981H1.76359C0.785741 45.9981 0 45.2103 0 44.2298V39.1639C0 38.1834 0.785741 37.3956 1.76359 37.3956H6.80463C7.78248 37.3956 8.57975 38.2797 8.57975 39.2602H1.8462Z"
                  fill="#1C325B"
                />
                <path
                  d="M17.7916 37.3975C18.7695 37.3975 19.5667 38.1853 19.5667 39.1658V46H17.6955V43.2282H12.8332V46H10.987V39.1658C10.987 38.1853 11.7727 37.3975 12.7506 37.3975H17.7916ZM17.6955 41.3636V39.2602H12.8332V41.3636H17.6955Z"
                  fill="#1C325B"
                />
                <path
                  d="M29.7084 37.3975H31.6276V46H29.768V40.2291C28.8036 41.3771 27.7662 42.6426 26.8133 43.7656L23.8451 40.2406V46H21.9989V37.3975H23.9066L26.8152 40.8743L29.7103 37.3975H29.7084Z"
                  fill="#1C325B"
                />
                <path
                  d="M34.1404 37.3975H36.0001V46H34.1404V37.3975Z"
                  fill="#1C325B"
                />
              </svg>
            </Link>
          </div>
        </Typography>
        <div className="hidden lg:block">
          {" "}
          <div className=" lg:block hidden">
            <button
              className={`mx-2 py-2 mt-[22px] text-gray-500 px-4 h-12  relative ${
                active == "home"
                  ? "border-t-[1px] font-bold w-[80px] rounded-t-lg border-b-white text-[#263238]"
                  : "font-medium "
              }`}
              onClick={() => {
                navigate("/");
                return handleClick("home");
              }}
            >
              <span
                className={`absolute -left-[5px] h-[1px] w-[89px] -right-1 bottom-[2.5px] ${
                  active == "home" && " bg-white h-[1px]  "
                }`}
              ></span>
              <span
                className={`absolute -left-[19.3px] bottom-[2.5px] ${
                  active == "home" &&
                  "border-r-[1px] border-r-gray-100 border-b-[1px] rounded-br-lg  rounded- w-[20px] h-[40px]"
                }`}
              ></span>
              <span
                className={`absolute -right-[23px] bottom-[2.5px] ${
                  active == "home" &&
                  "border-l-[1px] border-l-gray-100 border-r-white rounded-b-lg w-6 h-[40px]"
                }`}
              ></span>
              Home
            </button>

            <button
              className={`mx-2 py-2 mt-[22px]  px-4 h-12 text-gray-500  relative ${
                active == "what"
                  ? "border-t-[1px] font-bold w-[130px] rounded-t-lg border-b-white text-[#263238]"
                  : "font-medium"
              }`}
              onClick={() => {
                navigate("/whatwedo");
                return handleClick("what");
              }}
            >
              <span
                className={`absolute -left-[7px] h-[1px] w-[142px] -right-1 bottom-[2.5px] ${
                  active == "what" && " bg-white h-[1px]  "
                }`}
              ></span>
              <span
                className={`absolute -left-[19.3px] bottom-[2.5px] ${
                  active == "what" &&
                  "border-r-[1px] border-r-gray-100 border-b-[1px] rounded-br-lg  rounded- w-[20px] h-[39px]"
                }`}
              ></span>
              <span
                className={`absolute -right-[23.5px] bottom-[2.5px] ${
                  active == "what" &&
                  "border-l-[1px] border-l-gray-100 border-r-white-100 rounded-b-lg w-6 h-[39px]"
                }`}
              ></span>
              What We Do
            </button>
            <button
              className={`mx-2 py-2 mt-[22px]  px-4 h-12 text-gray-500  relative ${
                active == "GAMI"
                  ? "border-t-[1px] font-bold w-[150px] rounded-t-lg border-b-white text-[#263238]"
                  : "font-medium"
              }`}
              onClick={() => {
                navigate("/statistics");
                return handleClick("GAMI");
              }}
            >
              <span
                className={`absolute -left-[12px] h-[1px] w-[167px] -right-1 bottom-[2.5px] ${
                  active == "GAMI" && " bg-white h-[1px]  "
                }`}
              ></span>
              <span
                className={`absolute -left-[19.3px] bottom-[2.5px] ${
                  active == "GAMI" &&
                  "border-r-[1px] border-r-gray-100 border-b-[1px] rounded-br-lg  rounded- w-[20px] h-[39px]"
                }`}
              ></span>
              <span
                className={`absolute -right-[23px] bottom-[2.5px] ${
                  active == "GAMI" &&
                  "border-l-[1px] border-l-gray-100 border-r-white rounded-bl-lg w-6 h-[39px]"
                }`}
              ></span>
              GAMI Statistics
            </button>
            <button
              className={`mx-2 py-2 mt-[22px]  px-4 h-12 text-gray-500  relative ${
                active == "contact"
                  ? "border-t-[1px] font-bold w-[120px] rounded-t-lg border-b-white text-[#263238]"
                  : "font-medium"
              }`}
              onClick={() => {
                navigate("/contact");
                return handleClick("contact");
              }}
            >
              <span
                className={`absolute -left-[6px] h-[1px] w-[131px] -right-1 bottom-[2.5px] ${
                  active == "contact" && " bg-white h-[1px]  "
                }`}
              ></span>
              <span
                className={`absolute -left-[19.3px] bottom-[2.5px] ${
                  active == "contact" &&
                  "border-r-[1px] border-r-gray-100 border-b-[1px] rounded-br-lg  rounded- w-[20px] h-[39px]"
                }`}
              ></span>
              <span
                className={`absolute -right-[23px] bottom-[2.5px] ${
                  active == "contact" &&
                  "border-l-[1px] border-l-gray-100 border-r-white rounded-b-lg w-6 h-[39px]"
                }`}
              ></span>
              Contact Us
            </button>
          </div>
        </div>
        {!user?.username ? (
          <Button
            variant="danger"
            size="sm"
            className="hidden lg:inline-block text-white  items-center font-[600] leading-[34px]  bg-[#1E293B] hover:bg-[#334155] justify-center
     rounded-[8px]"
            onClick={() => navigate("/")}
          >
            <span>Buy Nows</span>
          </Button>
        ) : (
          <Button
            variant="danger"
            size="sm"
            className="hidden lg:inline-block text-white  items-center font-[600] leading-[34px]  bg-[#1E293B] hover:bg-[#334155] justify-center
     rounded-[8px]"
            onClick={logOut}
          >
            <span>Logout</span>
          </Button>
        )}

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {!user?.username ? (
            <Button
              variant="danger"
              size="sm"
              fullWidth
              className="text-white flex items-center font-[600] leading-[34px] px-[28px] py-[14px]  bg-[#1E293B] hover:bg-[#334155] justify-center
     rounded-[8px]"
            >
              Buy GAMI
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              fullWidth
              className="text-white flex items-center font-[600] leading-[34px] px-[28px] py-[14px]  bg-[#1E293B] hover:bg-[#334155] justify-center
     rounded-[8px]"
              onClick={logOut}
            >
              <span>Logout</span>
            </Button>
          )}
        </div>
      </MobileNav>
    </div>
  );
};

export default NavBar;
