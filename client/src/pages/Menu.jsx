import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
            <div className="text-[24px] font-bold  text-white">
              <h4>{menu.name}</h4>{" "}
              <h4 className="text-[#FBA819]">
                {" "}
               {menu.offerStatus ? `${menu.offerClickPercentage}% offer` : ""}
              </h4>{" "}
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-[#FBA819]">
                $
                {menu.offerStatus
                  ? menu.finalPrice.toFixed(2)
                  : menu.price.toFixed(2)}
              </div>
              {menu.offerStatus && (
                <div className="text-sm text-white line-through">
                  Original: ${menu.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          <div className=" flex justify-end">
            <button className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Order Now
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">
        No menu items available for this category.
      </p>
    );
  };

  if (loading) return <p>Loading.</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="  pt-[10] bg-black ">
      <div className=" container mx-auto pt-[150px] ">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#FBA819]">
          Discover our
        </h2>
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#FBA819]">
          MOUTH WATERING MENU
        </h2>
        <div className="grid grid-cols-3 gap-[64px]">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center">
              No categories available.
            </p>
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
    </div>
  );
}

export default Menu;
