import React, { useEffect, useState } from "react";
import OrderForm from "../components/OrderForm";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  useEffect(() => {
    // Retrieve user session data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const fetchData = async () => {
      try {
        const [menusResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/menus"),
          axios.get("http://localhost:8080/api/categories"),
        ]);

        setMenus(menusResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderClick = (menu) => {
    if (!userData) {
      setIsAlertModalOpen(true);
    } else {
      setSelectedMenu(menu);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const renderMenuItemsByCategory = (categoryId) => {
    const filteredMenus = menus.filter(
      (menu) => menu.category && menu.category.id === categoryId
    );

    return filteredMenus.length > 0 ? (
      filteredMenus.map((menu) => (
        <div
          key={menu.id}
          className="mb-4 p-4 border h-[160px] rounded-lg shadow-md bg-[#1a1a1a] hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-[24px] font-bold text-white">
              <h4>{menu.name}</h4>
              <h4 className="text-[#FBA819]">
                {menu.offerStatus ? `${menu.offerClickPercentage}% offer` : ""}
              </h4>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-[#FBA819]">
                ${menu.offerStatus ? menu.finalPrice.toFixed(2) : menu.price.toFixed(2)}
              </div>
              {menu.offerStatus && (
                <div className="text-sm text-white line-through">
                  Original: ${menu.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleOrderClick(menu)}
              className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Order Now
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No menu items available for this category.</p>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-[10] bg-black">
      <div className="container mx-auto pt-[150px]">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#FBA819]">
          Discover our
        </h2>
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#FBA819]">
          MOUTH WATERING MENU
        </h2>
        <div className="grid grid-cols-3 gap-[64px]">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories available.</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {category.categoryName}
                </h3>
                {renderMenuItemsByCategory(category.id)}
              </div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className=" p-8 rounded-lg shadow-lg w-full  mx-auto container pl-[320px]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600"
              >
                ×
              </button>
              <OrderForm menu={selectedMenu} onClose={closeModal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAlertModalOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
              <h2 className="text-xl font-semibold mb-4">Login Required</h2>
              <p className="mb-4">You need to be logged in to place an order. Please log in to continue.</p>
             
              <button
                onClick={closeAlertModal}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
