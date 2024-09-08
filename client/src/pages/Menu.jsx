import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PaymentCard from "../components/PaymentCard";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 

  const [isPaymentCardVisible, setIsPaymentCardVisible] = useState(true);

  const handleClose = () => {
    setIsPaymentCardVisible(false);
  };

  useEffect(() => {
   
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

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setSelectedItems(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleAddToCart = (menu) => {
    const existingItem = selectedItems.find((item) => item.id === menu.id);

    if (existingItem) {
      const updatedItems = selectedItems.map((item) =>
        item.id === menu.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...menu, quantity: 1 }]);
    }
    if (!userData) {
      setIsAlertModalOpen(true);
      
    } else {
      setIsCartOpen(true); 
    }
    
  };

  const handleRemoveFromCart = (menu) => {
    const updatedItems = selectedItems
      .map((item) =>
        item.id === menu.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setSelectedItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, item) =>
        total + item.quantity * (item.offerStatus ? item.finalPrice : item.price),
      0
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const filterMenus = () => {
    if (!searchQuery) {
      return menus;
    }
    return menus.filter((menu) =>
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderMenuItemsByCategory = (categoryId) => {
    const filteredMenus = filterMenus().filter(
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
          <div className="flex justify-start">
            <button
              onClick={() => handleAddToCart(menu)}
              className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Add To Card
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No menu items available for this category.</p>
    );
  };

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
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

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg w-1/2 text-black"
          />
        </div>

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

      <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed top-0 right-0 h-full bg-gradient-to-br from-purple-900 to-gray-900 text-white w-[480px] shadow-2xl p-6 z-50 rounded-l-3xl backdrop-blur-lg border-l border-white/20"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute top-6 right-6 text-gray-300 hover:text-white text-3xl"
          >
            &times;
          </button>

          {/* Cart Title */}
          <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wide bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Your Cart
          </h2>

          {/* Cart Items */}
          {selectedItems.length > 0 ? (
            <div className="space-y-8">
              <ul className="space-y-6">
                {selectedItems.map((item) => (
                  <li key={item.id} className="p-6 rounded-xl bg-white/10 shadow-lg backdrop-blur-md flex flex-col items-center space-y-4">
                    <div className="flex justify-between items-center w-full text-lg font-semibold">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="text-xl text-pink-300">
                        ${(
                          item.quantity *
                          (item.offerStatus ? item.finalPrice : item.price)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between w-full space-x-4">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-green-400/90 py-2 px-4 rounded-full text-white shadow-md hover:bg-green-500 hover:shadow-lg transition-all"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="bg-red-400/90 py-2 px-4 rounded-full text-white shadow-md hover:bg-red-500 hover:shadow-lg transition-all"
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total Amount */}
              <div className="mt-10 text-3xl font-extrabold text-center text-white">
                Total: <span className="text-pink-300">${calculateTotalPrice().toFixed(2)}</span>
              </div>

              {/* Pay Now Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handlePaymentClick}
                  className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 py-4 px-12 rounded-full font-bold text-xl text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-transform"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-300 text-lg mt-16">Your cart is empty.</p>
          )}
        </motion.div>
      )}
 {/* Payment Modal */}
 {isPaymentModalOpen && (
  <motion.div
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
     {isPaymentCardVisible && (
    <PaymentCard 
  userData={userData} 
  selectedItems={selectedItems} 
  totalPrice={calculateTotalPrice()} 
  onClose={handleClose}

/>
     )}
  </motion.div>
)}

      
    </AnimatePresence>
    </div>
  );
}

export default Menu;
