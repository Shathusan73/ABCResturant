import React, { useState } from 'react';

const EditMenuModal = ({ isOpen, onClose, menu, onSave }) => {
  const [editedMenu, setEditedMenu] = useState(menu);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMenu({ ...editedMenu, [name]: value });
  };

  const handleSave = () => {
    onSave(editedMenu);
    onClose();
  };

  return (
    isOpen ? (
      <div className="modal">
        <h2>Edit Menu Item</h2>
        <input
          type="text"
          name="name"
          value={editedMenu.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          value={editedMenu.price}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  );
};

export default EditMenuModal;
