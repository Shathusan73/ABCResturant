import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

function CreateBookingForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Submit the booking data to the backend
      await axios.post('http://localhost:8080/api/bookings', {
        ...data,
        status: data.status || 'PENDING', // Use default or selected status
      });
      toast.success('Table booked successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to book the table');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto  bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Table Booking</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        <div className="mb-4 col-span-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className={`p-2 border rounded w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' } })}
            className={`p-2 border rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            className={`p-2 border rounded w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            {...register('phone', { required: 'Phone number is required', pattern: { value: /^\d+$/, message: 'Phone number is invalid' } })}
            className={`p-2 border rounded w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            className={`p-2 border rounded w-full ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700">Booking Time</label>
          <input
            type="datetime-local"
            id="bookingTime"
            {...register('bookingTime', { required: 'Booking time is required' })}
            className={`p-2 border rounded w-full ${errors.bookingTime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bookingTime && <span className="text-red-500 text-sm">{errors.bookingTime.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="persons" className="block text-sm font-medium text-gray-700">Number of Persons</label>
          <input
            type="number"
            id="persons"
            {...register('persons', { required: 'Number of persons is required', min: { value: 1, message: 'At least one person is required' } })}
            className={`p-2 border rounded w-full ${errors.persons ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.persons && <span className="text-red-500 text-sm">{errors.persons.message}</span>}
        </div>

        <div className="mb-4 col-span-1">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            {...register('status')}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELED">Canceled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="mb-4 col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            {...register('message')}
            className="p-2 border border-gray-300 rounded w-full"
            rows="3"
          />
        </div>

        <div className="mb-4 col-span-2">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
          <textarea
            id="specialRequests"
            {...register('specialRequests')}
            className="p-2 border border-gray-300 rounded w-full"
            rows="3"
          />
        </div>
      

       

        <div className="col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#360909] text-white px-4 py-2 rounded w-full  disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBookingForm;
