import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import HeaderMenu from "./HeaderMenu";
// import { ArrowWhite } from "../constants/Data";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "../Hooks/UseWindowSize";
// import { HeaderActiveIcon } from "../constants/Data";
import Contact from "../pages/Contact";
function Header() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const [isIconVisible, setIsIconVisible] = useState(false);
  const size = useWindowSize();
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
    // Add scroll event listener
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
                  <Link to="/">  A taste of excellence</Link>
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
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "courses"
                    ? "text-[#FBA919]"
                    : "hover:text-[#8D8D8E]"
                }`}
                onClick={() => handleLinkClick("courses")}
              >
                {/* {activeLink === "courses" && (
                  <img
                    src={HeaderActiveIcon}
                    alt="HeaderActiveIcon"
                    className="h-[12px] w-[12px] headericon"
                  />
                )} */}
                <Link to="/courses" onClick={handleClick}>
                  GALLERY
                </Link>
              </div>
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "gallery"
                    ? "text-[#FBA919]"
                    : "hover:text-[#8D8D8E]"
                }`}
                onClick={() => handleLinkClick("gallery")}
              >
                {activeLink === "gallery" && (
                  <img
                    src={HeaderActiveIcon}
                    alt="HeaderActiveIcon"
                    className="h-[12px] w-[12px] headericon"
                  />
                )}
                <Link to="/gallery" onClick={handleClick}>
                  RESERVATION
                </Link>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-black font-bold m-0 cursor-pointer bg-[#FBA819]  transition"
                onClick={toggleContactForm}
              >
                CONTACT
                {/* <img
                  src={ArrowWhite}
                  alt="ArrowWhite"
                  className="w-[20px] icon-btn h-[19px]"
                /> */}
              </div>

              
    <div className="w-fit rounded-xl ">
        <button className="px-4 py-2 rounded-xl border border-[#FBA819] m-0  text-white transition">Login</button>
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
    </>
  );
}

export default Header;
