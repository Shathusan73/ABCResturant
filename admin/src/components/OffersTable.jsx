import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Modal, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OffersTable() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    percentage: '',
    description: '',
    image: null, // Add this line to handle the image
  });

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        toast.error('Failed to fetch offers.');
      }
    };
    fetchOffers();
  }, []);

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      name: offer.name,
      percentage: offer.percentage,
      description: offer.description,
      image: null, // Reset image field
    });
    setIsEditModalOpen(true);
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0], // Update image state
    });
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('percentage', formData.percentage);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image); // Append image file
    }

    try {
      await axios.put(`http://localhost:8080/api/offers/${selectedOffer.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === selectedOffer.id ? { ...offer, ...formData } : offer
        )
      );
      setIsEditModalOpen(false);
      toast.success('Offer updated successfully.');
    } catch (error) {
      console.error('Error updating offer:', error);
      toast.error('Failed to update offer.');
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/offers/${offerId}`);
      setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));
      toast.success('Offer deleted successfully.');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer.');
    }
  };

  return (
    <>
    <div className='flex gap-[32px]'>
    <div className="w-f  p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Offers List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Poster</th>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Percentage</th>
            <th className="border-b px-4 py-2">Description</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="border-b px-4 py-2">
                <img 
                  src={`http://localhost:8080/uploads/images/${offer.imageUrl}`} 
                  alt={offer.name} 
                  className="w-24 h-16 object-cover" 
                />
              </td>
              <td className="border-b px-4 py-2">{offer.name}</td>
              <td className="border-b px-4 py-2">{offer.percentage}%</td>
              <td className="border-b  px-4 py-2">{offer.description}</td>
              <td className="border-b px-4 py-2">
                <Button
                  onClick={() => handleEdit(offer)}
                  variant="outlined"
                  color="primary"
                  className="mr-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => handleDelete(offer.id)}
                  variant="outlined"
                  color="secondary"
                >
                  <FaTrash className='text-red-600' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />

      {/* Edit Offer Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="modal-content p-6 mx-auto bg-white shadow-lg rounded-md max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Offer</h2>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Percentage"
            type="number"
            value={formData.percentage}
            onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
          <div className="mt-4">
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="outlined"
              color="secondary"
              className="ml-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>


    
    </div>
    <div className='grid grid-cols-2 gap-[16px]  '> 
    {offers.map((offer) => (
            
          <div  key={offer.id} className="container  bg-gradient-to-r from-indigo-950 to-black text-white p-8 rounded-lg shadow-lg ">
            <div className="text-3xl font-bold mb-4">Special Offer!</div>
            <div className="text-lg mb-4">
              Get <span className="text-yellow-400 font-bold">{offer.percentage}% OFF</span> your next purchase!
            </div>
           
           <div>
           <img 
                  src={`http://localhost:8080/uploads/images/${offer.imageUrl}`} 
                  alt={offer.name} 
                  className=" w-[400px] h-[200px]  object-cover" 
                />

           </div>
            <div className="text-sm flex flex-col gap-[4px] mt-4">
              
              <p  className='text-yellow-400 font-bold'>{offer.name}</p>
              <p>{offer.description}</p>
            </div>
          </div>
        ))}

    </div>
    </div>
    </>
  );
}

export default OffersTable;
