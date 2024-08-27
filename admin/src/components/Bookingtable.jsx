import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    dateOfBirth: '',
    bookingTime: '',
    persons: '',
    message: '',
    specialRequests: '',
    status: ''
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Error fetching bookings.');
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData({ ...booking });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${formData.id}`, formData);
      setIsModalOpen(false);
      fetchBookings();
      toast.success('Booking updated successfully.');
    } catch (error) {
      toast.error('Error updating booking.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
      toast.success('Booking deleted successfully.');
    } catch (error) {
      toast.error('Error deleting booking.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Booking Table</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Address</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Date of Birth</th>
            <th className="px-4 py-2 border-b">Booking Time</th>
            <th className="px-4 py-2 border-b">Persons</th>
            <th className="px-4 py-2 border-b">Message</th>
            <th className="px-4 py-2 border-b">Special Requests</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-4 py-2 border-b">{booking.id}</td>
              <td className="px-4 py-2 border-b">{booking.name}</td>
              <td className="px-4 py-2 border-b">{booking.email}</td>
              <td className="px-4 py-2 border-b">{booking.address}</td>
              <td className="px-4 py-2 border-b">{booking.phone}</td>
              <td className="px-4 py-2 border-b">{new Date(booking.dateOfBirth).toLocaleDateString()}</td>
              <td className="px-4 py-2 border-b">{new Date(booking.bookingTime).toLocaleString()}</td>
              <td className="px-4 py-2 border-b">{booking.persons}</td>
              <td className="px-4 py-2 border-b">{booking.message}</td>
              <td className="px-4 py-2 border-b">{booking.specialRequests}</td>
              <td className={`px-4 py-2 border-b ${getStatusColor(booking.status)}`}>{booking.status}</td>
              <td className="px-4 py-2 border-b flex space-x-2">
                <button onClick={() => handleEdit(booking)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-lg relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500">
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Booking Time</label>
                <input
                  type="datetime-local"
                  name="bookingTime"
                  value={formData.bookingTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Persons</label>
                <input
                  type="number"
                  name="persons"
                  value={formData.persons}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">Select Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookingTable;
