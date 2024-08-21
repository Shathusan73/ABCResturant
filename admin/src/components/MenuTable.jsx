import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const MenuTable = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    description: '',
    ingredients: [],
    categoryId: ''
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menus');
      setMenus(response.data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
      console.error('Fetch menus error:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Fetch categories error:', error);
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setEditForm({
      name: menu.name,
      price: menu.price,
      description: menu.description,
      ingredients: menu.ingredients,
      categoryId: menu.category ? menu.category.id : ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveEdit = async () => {
    if (!editingMenu) return;

    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('price', parseFloat(editForm.price));
    formData.append('description', editForm.description);
    formData.append('ingredients', JSON.stringify(editForm.ingredients));
    formData.append('categoryId', editForm.categoryId);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:8080/api/menus/${editingMenu.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Menu item updated successfully!');
      setEditingMenu(null);
      fetchMenus();
    } catch (error) {
      toast.error('Failed to update menu item');
      console.error('Update error:', error);
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient) {
      setEditForm((prevForm) => ({
        ...prevForm,
        ingredients: [...prevForm.ingredients, newIngredient]
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setEditForm((prevForm) => ({
      ...prevForm,
      ingredients: prevForm.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`http://localhost:8080/api/menus/${id}`);
        toast.success('Menu item deleted successfully!');
        fetchMenus();
      } catch (error) {
        toast.error('Failed to delete menu item');
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Ingredients</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map(menu => (
            <tr key={menu.id}>
              <td className="py-2 px-4 border-b">
                <img src={`http://localhost:8080/uploads/images/${menu.imageUrl}`} alt={menu.name} className="w-20 h-20 object-cover" />
              </td>
              <td className="py-2 px-4 border-b">{menu.name}</td>
              <td className="py-2 px-4 border-b">${menu.price}</td>
              <td className="py-2 px-4 border-b">{menu.description}</td>
              <td className="py-2 px-4 border-b">{menu.ingredients.join(', ')}</td>
              <td className="py-2 px-4 border-b">{menu.category ? menu.category.categoryName : 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(menu)}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                {!editingMenu && (
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Menu Modal */}
      {editingMenu && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="number"
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <div>
                <label className="block mb-2">Ingredients:</label>
                {editForm.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      readOnly
                      className="p-2 border border-gray-300 rounded w-full mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add Ingredient"
                    className="p-2 border border-gray-300 rounded w-full mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label className="block mb-2">Category:</label>
                <select
                  name="categoryId"
                  value={editForm.categoryId}
                  onChange={handleEditChange}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Image:</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingMenu(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuTable;
