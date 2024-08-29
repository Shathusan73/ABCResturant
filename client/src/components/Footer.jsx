import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "../Hooks/UseWindowSize";

function Footer() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const [showContactForm, setShowContactForm] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const size = useWindowSize();
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const path = location.pathname;
    const link = path.includes("about")
      ? "about"
      : path.includes("menu")
      ? "menu"
      : path.includes("reservations")
      ? "reservations"
      : path.includes("contact")
      ? "contact"
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

  return (
    <>
      <div>
        <div className="flex relative flex-col overflow-hidden bg-[#FBA819]">
          <div className="lg:py-[80px] py-[48px] md:px-[24px] px-[16px]">
            <div className="container mx-auto">
              <div className="flex flex-col gap-[24px] lg:items-start md:items-center items-start">
                <div className="flex flex-col md:gap-[8px] gap-[12px] font-Manrope text-start capitalize">
                  <h3 className="md:text-[42px] leading-[130%] lg:text-start md:text-center text-start text-[28px] font-bold text-black">
                    Ready to savor the best flavors?
                  </h3>
                  <p className="md:text-[24px] leading-[130%] lg:text-start md:text-center text-start text-[18px] font-normal text-black">
                    Connect with us for delightful dining experiences
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1C1C]">
          <div className="flex flex-col">
            <div className="lg:py-[80px] py-[48px] md:px-[24px] px-[16px]">
              <div className="container mx-auto ">
                <div className="flex lg:flex-row justify-between flex-col gap-[44px]">
                  <div className="flex flex-col lg:gap-[24px] md:gap-[36px] gap-[40px]">
                    <div className="flex flex-col lg:gap-[24px] md:gap-[24px] gap-[28px] lg:items-start md:items-center items-center">
                      <div>
                        <div className="flex lg:flex-row lg:gap-[4px] md:flex-row md:gap-[4px] flex-col gap-[20px] items-center">
                          <div className="flex flex-col md:gap-[2px] gap-[6px] lg:items-start md:items-start items-center md:border-l md:border-l-[#ffffff75] px-[6px] md:shadow-left">
                            <h3 className="text-white text-start font-bold md:text-[16px] text-[14px] uppercase font-PlusJakartaSans">
                              <Link to="/" onClick={handleClick}>
                                ABC RESTURANT
                              </Link>
                            </h3>
                            <p className="text-[#cccccc] text-start font-light md:text-[10px] text-[14px] capitalize font-Manrope">
                              <Link to="/" onClick={handleClick}>
                                A taste of excellence
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block w-[268px] text-[#E1E1E1] font-Manrope font-light text-[14px] h-[42px] lg:w-[435px] capitalize lg:text-start md:text-center">
                        <p>
                          Serving up a delightful array of dishes made from the freshest ingredients.
                        </p>
                      </div>
                      <div className="flex lg:hidden md:flex-row md:gap-[24px] flex-row gap-[12px] text-white items-center justify-center">
                        <Link to="https://www.facebook.com/yourrestaurant">
                          <p className="border border-[#949191] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                            <FiFacebook />
                          </p>
                        </Link>
                        <Link to="https://wa.me/yourwhatsappnumber">
                          <p className="border border-[#949191] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                            <FaWhatsapp />
                          </p>
                        </Link>
                        <Link to="https://www.youtube.com/yourrestaurant">
                          <p className="border border-[#949191] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                            <CiYoutube />
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="flex lg:flex-col lg:px-0 md:px-[12px] px-0 md:flex-row flex-col items-start justify-between gap-[16px] text-white">
                      <div className="flex gap-[4px] items-center">
                        <p className="text-[#FBA819] text-[24px]">
                          <CiLocationOn />
                        </p>
                        <p className="text-white lg:w-full w-[240px] text-[16px] font-normal font-Manrope">
                          123 Culinary St, Flavor Town, SRILANKA.
                        </p>
                      </div>
                      <div className="flex gap-[4px] items-center">
                        <p className="text-[#FBA819] text-[24px]">
                          <CiMail />
                        </p>
                        <p className="text-white text-[16px] font-normal font-Manrope">
                          reservations@gourmetbistro.com
                        </p>
                      </div>
                      <div className="flex gap-[4px] items-center">
                        <p className="text-[#FBA819] text-[24px]">
                          <PiPhoneLight />
                        </p>
                        <p className="text-white text-[16px] font-normal font-Manrope">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-white lg:px-0 md:px-[24px] px-0">
                    <div className="flex md:flex-row flex-col justify-between gap-[32px] md:gap-[84px] font-Manrope">
                      <div className="flex flex-col gap-[16px]">
                        <p className="text-[#FBA819] font-bold text-[18px] uppercase">
                          Quick Links
                        </p>
                        <div className="flex flex-col gap-[12px] text-[16px] font-normal">
                          <Link to="/about" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "about"
                                  ? "text-[#8D8D8E]"
                                  : "hover:text-[#FBA819]"
                              }`}
                              onClick={() => handleLinkClick("about")}
                            >
                              About Us
                            </p>
                          </Link>
                          <Link to="/menu" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "menu"
                                  ? "text-[#8D8D8E]"
                                  : "hover:text-[#FBA819]"
                              }`}
                              onClick={() => handleLinkClick("menu")}
                            >
                              Menu
                            </p>
                          </Link>
                          <Link to="/reservations" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "reservations"
                                  ? "text-[#8D8D8E]"
                                  : "hover:text-[#FBA819]"
                              }`}
                              onClick={() => handleLinkClick("reservations")}
                            >
                              Reservations
                            </p>
                          </Link>
                          <Link to="/gallery" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "gallery"
                                  ? "text-[#8D8D8E]"
                                  : "hover:text-[#FBA819]"
                              }`}
                              onClick={() => handleLinkClick("gallery")}
                            >
                              Gallery
                            </p>
                          </Link>
                          <Link to="/contact" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "contact"
                                  ? "text-[#8D8D8E]"
                                  : "hover:text-[#FBA819]"
                              }`}
                              onClick={() => handleLinkClick("contact")}
                            >
                              Contact
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[16px]">
                        <p className="text-[#FBA819] font-bold text-[18px] uppercase">
                          Opening Hours
                        </p>
                        <div className="flex flex-col gap-[12px] text-[16px] font-normal">
                          <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
                          <p>Sat - Sun: 9:00 AM - 11:00 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex flex-row hidden gap-[24px] mt-[32px]">
                      <Link to="https://www.facebook.com/yourrestaurant">
                        <p className="border border-[#949191] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                          <FiFacebook />
                        </p>
                      </Link>
                      <Link to="https://wa.me/yourwhatsappnumber">
                        <p className="border border-[#949191] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                          <FaWhatsapp />
                        </p>
                      </Link>
                      <Link to="https://www.youtube.com/yourrestaurant">
                        <p className="border border-[#949191] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                          <CiYoutube />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0D0D0D]">
              <div className="lg:py-[32px] py-[24px] md:px-[24px] px-[16px]">
                <div className="container mx-auto ">
                  <div className="flex lg:flex-row flex-col justify-between items-center gap-[12px]">
                    <div className="text-[#F5F5F5] text-[14px] text-center font-Manrope">
                      © 2024 ABC Resturant. All Rights Reserved.
                    </div>
                    <div className="flex lg:gap-[16px] gap-[12px] text-[#F5F5F5]">
                      <Link to="/">Privacy Policy</Link>
                      <Link to="/">Terms of Service</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              className="contact-form-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={isMobile ? mobileVariants : desktopVariants}
              transition={isMobile ? mobileTransition : desktopTransition}
            >
              <div className="contact-form">
                <IoMdClose onClick={toggleContactForm} />
                {/* Place your contact form component here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Footer;
