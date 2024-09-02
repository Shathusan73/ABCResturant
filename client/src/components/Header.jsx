import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "../Hooks/UseWindowSize";
import Contact from "../pages/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

function Header() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const [isIconVisible, setIsIconVisible] = useState(false);
  const size = useWindowSize();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeForm();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsIconVisible(true);
  };

  const handleClick = () => {
    setIsIconVisible(true);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const path = location.pathname;
    const link = path.includes("aboutus")
      ? "aboutus"
      : path.includes("services")
      ? "services"
      : path.includes("courses")
      ? "courses"
      : path.includes("contactus")
      ? "contactus"
      : path.includes("gallery")
      ? "gallery"
      : "home";
    setActiveLink(link);
  }, [location.pathname]);

  const isMobile = size.width <= 768;

  const mobileTransition = { duration: 0.4, stiffness: 70 };
  const desktopTransition = { duration: 0.6, stiffness: 90 };

  const mobileVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  };

  const desktopVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 0) ||
          currentScrollPos < 100
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const username = event.target.username?.value.trim();
    const phoneNumber = event.target.phoneNumber?.value.trim();

    if (isLoginForm) {
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/api/customers/login",
          { email, password }
        );
        toast.success("Login successful!");
        setIsLoggedIn(true);
        setUsername(response.data.username);
        const userData = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        closeForm();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect email or password.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      if (!username || !email || !phoneNumber || !password) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }
      try {
        await axios.post("http://localhost:8080/api/customers/register", {
          username,
          email,
          phoneNumber,
          password,
        });
        toast.success("Registration successful! Please log in.");
        setIsLoginForm(true);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Email or phone number already exists.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUsername("");
    toast.success("You have been logged out successfully!");
  };

  const handleUsernameClick = () => {
    if (isLoggedIn) {
      setShowLogoutButton(!showLogoutButton);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div
        className={`md:px-[24px] px-[16px] fixed z-30  bg-black w-full  drop-shadow-xl  ${
          visible ? "header-show" : "header-hide "
        }`}
      >
        <div className="container mx-auto md:py-[24px] py-[16px] ">
          <div className="flex justify-between z-20 bg-black">
            <div
              className="flex gap-[4px]"
              onClick={() => handleLinkClick("home")}
            >
              <Link to="/">
                <h2 className="text-[32px] text-[#FBA819] font-bold">ABC</h2>
              </Link>
              <div className=" md:flex flex-col hidden text-white gap-[2px] items-start justify-center border-l border-l-[#fba81975] px-[6px] shadow-left">
                <h3 className=" text-start font-bold md:text-[16px] text-[10px] uppercase font-PlusJakartaSans">
                  <Link to="/">ABC RESTURANT</Link>
                </h3>
                <p className="text-[#dfdfdf] text-start  uppercase font-light md:text-[10px] text-[8px]  font-Manrope">
                  <Link to="/"> A taste of excellence</Link>
                </p>
              </div>
            </div>
            <div className="hidden lg:flex gap-[16px] items-center font-medium text-[16px] text-start text-[#FBA819] font-Manrope">
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "aboutus"
                    ? "text-[#FBA919]"
                    : "hover:text-[#8D8D8E]"
                }`}
                onClick={() => handleLinkClick("aboutus")}
              >
                {activeLink === "about" && (
                  <img
                    src={HeaderActiveIcon}
                    alt="HeaderActiveIcon"
                    className="h-[12px] w-[12px] headericon"
                  />
                )}
                <Link to="/about" onClick={handleClick}>
                  ABOUT
                </Link>
              </div>
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "menu"
                    ? "text-[#FBA919] "
                    : "hover:text-[#8D8D8E] "
                }`}
                onClick={() => handleLinkClick("menu")}
              >
                {/* {activeLink === "services" && (
                  <img
                    src={HeaderActiveIcon}
                    alt="HeaderActiveIcon"
                    className="h-[12px] w-[12px] headericon"
                  />
                )} */}
                <Link to="/menu" onClick={handleClick}>
                  MENU
                </Link>
              </div>
              <div
               
               >
                <Link to="gallery" >
                  GALLERY
                </Link>
              </div>
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "reservations"
                    ? "text-[#FBA919]"
                    : "hover:text-[#8D8D8E]"
                }`}
                
              >
           
                <Link to="/reservation" onClick={handleClick}>
                  RESERVATION
                </Link>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-black font-bold m-0 cursor-pointer bg-[#FBA819]  transition"
                onClick={toggleContactForm}
              >
                CONTACT
              </div>

              <div className="w-fit rounded-xl ">
                <button
                  className="px-4 py-2 rounded-xl border border-[#FBA819] m-0  text-white transition"
                  onClick={openForm}
                >
                  {" "}
                  {isLoggedIn ? (
                    <div
                      className="flex items-center capitalize gap-2"
                      onClick={handleUsernameClick}
                    >
                      <FaUser size={20} />
                      <span className="mr-2 cursor-pointer">{username}</span>
                    </div>
                  ) : (
                    <span>{isLoginForm ? "Login" : "Register"}</span>
                  )}
                </button>
                {isFormOpen && !isLoggedIn && (
                  <div
                    ref={formRef}
                    className="absolute right-[180px] top-[80px] w-[500px] mt-4 p-4 bg-slate-900 text-white rounded shadow-lg"
                  >
                    <form onSubmit={handleFormSubmit}>
                      <h2 className="text-center text-2xl mb-4">
                        {isLoginForm ? "Login" : "Register"}
                      </h2>
                      {isLoginForm ? (
                        <>
                          <div className="my-2">
                            <label className="block text-white">Email:</label>
                            <input
                              type="email"
                              name="email"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-gray-300">
                              Password:
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="my-2">
                            <label className="block text-white">
                              Username:
                            </label>
                            <input
                              type="text"
                              name="username"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-white">Email:</label>
                            <input
                              type="email"
                              name="email"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-white">
                              Phone Number:
                            </label>
                            <input
                              type="text"
                              name="phoneNumber"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-white">
                              Password:
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                        </>
                      )}
                      <button
                        type="submit"
                        className="w-full bg-[#FBA819] text-white py-2 rounded"
                      >
                        {isLoginForm ? "Login" : "Register"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleForm}
                        className="w-full bg-transparent border border-[#FBA819] text-[#FBA819] py-2 mt-2 rounded"
                      >
                        {isLoginForm
                          ? "Need an account? Register"
                          : "Already have an account? Login"}
                      </button>
                    </form>
                  </div>
                )}
                {isLoggedIn && showLogoutButton && (
                  <div className="absolute flex flex-col   items-center gap-4 right-[180px] top-[80px] w-[200px] mt-4 p-4 bg-slate-900 text-white rounded shadow-lg">
                    <Link to="myorder">
                      <div>My Orders</div>
                    </Link>
                    <Link to="mybookings">
                    <div>My bookings</div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 text-white py-2 rounded flex items-center justify-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="lg:hidden  flex items-center">
              <HeaderMenu toggleContactForm={toggleContactForm} />
            </div> */}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={
              isMobile ? mobileVariants.initial : desktopVariants.initial
            }
            animate={
              isMobile ? mobileVariants.animate : desktopVariants.animate
            }
            exit={isMobile ? mobileVariants.exit : desktopVariants.exit}
            transition={isMobile ? mobileTransition : desktopTransition}
            className="fixed inset-0 z-50 w-full top-0 flex justify-end  items-center"
          >
            <div className="bg-black px-[16px] hide-scrollbar overflow-scroll py-[36px]    md:px-[64px] md:py-[32px]  h-full  flex flex-col gap-[32px] w-[963px] ">
              <div className="flex justify-end ">
                <button
                  className=" text-[36px] text-white"
                  onClick={toggleContactForm}
                >
                  <IoMdClose />
                </button>
              </div>
              <div className=" text-[white] ">
                <Contact onFormSubmit={toggleContactForm} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}

export default Header;
