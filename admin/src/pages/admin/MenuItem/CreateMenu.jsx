import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast for notifications

const CreateMenu = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const [ingredientInput, setIngredientInput] = useState('');

  // New state variables
  const [offerStatus, setOfferStatus] = useState(false);
  const [offerClickPercentage, setOfferClickPercentage] = useState('0');
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    // Fetch categories from the backend
    axios.get('http://localhost:8080/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

 
  useEffect(() => {
    if (price && offerClickPercentage) {
      const discount = (price * offerClickPercentage) / 100;
      const newFinalPrice = price - discount;
      setFinalPrice(newFinalPrice.toFixed(2));
    } else {
      setFinalPrice(price); 
    }
  }, [price, offerClickPercentage, offerStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!name || !price || !description || ingredients.length === 0 || !categoryId || !image) {
      toast.error('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('ingredients', ingredients.join(','));
    formData.append('categoryId', categoryId);
    formData.append('image', image);
    formData.append('offerStatus', offerStatus);
    formData.append('offerClickPercentage', offerClickPercentage || '0'); // Default to '0' if not set
    formData.append('finalPrice', finalPrice || price); // Default to original price if finalPrice is empty

    try {
      const response = await axios.post('http://localhost:8080/api/menus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success('Menu item created successfully!');
      
        setName('');
        setPrice('');
        setDescription('');
        setIngredients([]);
        setCategoryId('');
        setImage(null);
        setOfferStatus(false);
        setOfferClickPercentage('0');
        setFinalPrice('');
      }
    } catch (error) {
      toast.error('Failed to create menu item');
      console.error(error);
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Menu Item</h2>

      <form onSubmit={handleSubmit}>
   
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* New offer fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Offer Status</label>
          <input
            type="checkbox"
            checked={offerStatus}
            onChange={(e) => setOfferStatus(e.target.checked)}
            className="mr-2"
          />
          <span>{offerStatus ? 'Active' : 'Inactive'}</span>
        </div>

        {offerStatus && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Offer Click Percentage</label>
              <input
                type="number"
                value={offerClickPercentage}
                onChange={(e) => setOfferClickPercentage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter discount percentage"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Final Price</label>
              <input
                type="text"
                value={finalPrice}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </>
        )}

        {/* Existing fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients</label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter ingredient"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-lg">
          Create Menu Item
        </button>
      </form>
    </div>
  );
};

export default CreateMenu;
