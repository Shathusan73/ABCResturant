import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const renderMenuItemsByCategory = (categoryId) => {
    const filteredMenus = menus.filter(
      (menu) => menu.category && menu.category.id === categoryId
    );

    return filteredMenus.length > 0 ? (
      filteredMenus.map((menu) => (
        <div
          key={menu.id}
          className="p-4 border rounded-lg shadow-md bg-[#1a1a1a] hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center ">
            <img
              src={`http://localhost:8080/uploads/images/${menu.imageUrl}`}
              className="w-[400px] h-[300px] object-cover"
              alt={menu.name}
            />
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
    <div className="py-[100px]  bg-black">
      <div className="container mx-auto pt-16">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#FBA819]">
          GALLERY
        </h2>
        <div className="mb-10 text-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`mx-2 py-2 px-4 rounded ${selectedCategory === null ? 'bg-[#FBA819] text-black' : 'bg-gray-700 text-white'}`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`mx-2 py-2 px-4 rounded ${selectedCategory === category.id ? 'bg-[#FBA819] text-black' : 'bg-gray-700 text-white'}`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {selectedCategory === null
            ? categories.flatMap(category => renderMenuItemsByCategory(category.id))
            : renderMenuItemsByCategory(selectedCategory)}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
