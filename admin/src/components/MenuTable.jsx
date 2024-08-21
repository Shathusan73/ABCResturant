import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const MenuTable = () => {
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [deletingMenu, setDeletingMenu] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    description: '',
    ingredients: '',
    category: ''
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menus');
      console.log('Fetched Menus:', response.data); // Debug: Check fetched data
      setMenus(response.data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
      console.error('Fetch menus error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/menus/${deletingMenu.id}`);
      toast.success('Menu item deleted successfully!');
      setDeletingMenu(null);
      fetchMenus();
    } catch (error) {
      toast.error('Failed to delete menu item');
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setEditForm({
      name: menu.name,
      price: menu.price,
      description: menu.description,
      ingredients: menu.ingredients.join(', '),
      category: menu.category ? menu.category.name : '' // Handle potential undefined category
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveEdit = async () => {
    console.log('Edit Form Data:', editForm); // Debug: Check form data

    const updatedMenu = {
      name: editForm.name,
      price: parseFloat(editForm.price),
      description: editForm.description,
      ingredients: editForm.ingredients.split(',').map(ing => ing.trim()),
      category: { name: editForm.category }
    };

    try {
      await axios.put(`http://localhost:8080/api/menus/${editingMenu.id}`, updatedMenu);
      toast.success('Menu item updated successfully!');
      setEditingMenu(null);
      fetchMenus();
    } catch (error) {
      toast.error('Failed to update menu item');
      console.error('Update error:', error);
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
              <td className="py-2 px-4 border-b">{menu.category ? menu.category.name : 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(menu)}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingMenu(menu)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
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
              <input
                type="text"
                name="ingredients"
                value={editForm.ingredients}
                onChange={handleEditChange}
                placeholder="Ingredients (comma-separated)"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingMenu(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMenu && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the menu item "{deletingMenu.name}"?</p>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setDeletingMenu(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuTable;
