import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";

const getLinksByUserRole = (userRole) => {
  if (userRole === "admin") {
    return [
      {
        to: "/dashboard",
        text: "Dashboard",
        icon: <BiSolidDashboard className="text-[20px]" />,
      },
      {
        to: "/allstaff",
        text: "Staff_Resturant",
        icon: <IoPersonCircleSharp  className="text-[20px]" />,
      },
      {
        to: "/all-category",
        text: "Category",
        icon: <MdCategory  className="text-[20px]" />,
      },
      {
        to: "/menu-item",
        text: "Menu",
        icon: <MdOutlineRestaurantMenu className="text-[20px]" />,
      },
      {
        to: "/Categories",
        text: "Doctors",
        icon: <FaUserDoctor className="text-[20px]" />,
      },
      {
        to: "/technicians",
        text: "Technicians",
        icon: <FaHospitalUser className="text-[20px]" />,
      },
      {
        to: "/payments",
        text: "Payments",
        icon: <MdOutlinePayment className="text-[20px]" />,
      },
      /*   {
        to: "/account",
        text: "Accounts",
        icon: <HiMiniUsers className="text-[20px]" />,
      }, */
    ];
  } else if (userRole === "staff") {
    return [
      {
        to: "/dashboard",
        text: "Dashboard",
        icon: <BiSolidDashboard className="text-[20px]" />,
      },
      {
        to: "/category",
        text: "Category",
        icon: <MdCategory  className="text-[20px]" />,
      },
      {
        to: "/payments",
        text: "Pay online",
        icon: <MdOutlinePayment className="text-[20px]" />,
      },
      {
        to: "/appointment-details",
        text: "Appointment",
        icon: <BiTask className="text-[20px]" />,
      },
    ];
  }
  return [];
};

const Sidebar = ({ isOpen, userRole }) => {
  const location = useLocation();
  const sidebarClasses = `fixed top-0 left-0 md:z-50 w-64 h-screen pt-20 transition-transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }  border-r border-gray-200 sm:translate-x-0 bg-[#0e2139] dark:border-gray-700`;

  const links = getLinksByUserRole(userRole);

  return (
    <>
      <aside id="logo-sidebar" className={sidebarClasses} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#181818] ">
            
          <p className="py-[30px] text-white divide-y divide-gray-100">Main</p>
          <ul className="space-y-2 flex flex-col gap-[30px] font-normal ">
            {links.map(({ to, text, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  exact
                  className={`flex  items-center p-2 rounded-lg text-white group ${
                    location.pathname === to ? "bg-[#27a732]" : ""
                  }`}
                >
                  {icon}
                  <span className="flex-1 font-normal ms-3 whitespace-nowrap text-[16px] ">
                    {text}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
