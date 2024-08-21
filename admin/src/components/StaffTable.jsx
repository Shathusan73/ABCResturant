import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function StaffTable({ staff, onDelete, onEdit }) {
  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-[#020b03]">
          <tr>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Staff Name</th>
            <th scope="col" className="px-6 py-3">Staff Email</th>
            <th scope="col" className="px-6 py-3">Staff Phone</th>
            <th scope="col" className="px-6 py-3">Password</th>
            <th scope="col" className="px-6 py-3">Nic No</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 font-medium text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={member.id}
            >
              <td className="px-6 py-4 text-white">{member.id}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{member.name}</td>
              <td className="px-6 py-4">{member.email}</td>
              <td className="px-6 py-4">{member.phone}</td>
              <td className="px-6 py-4">{member.password}</td>
              <td className="px-6 py-4">{member.nic}</td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => onEdit(member)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <MdEdit className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => onDelete(member.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDelete className="w-5 h-5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffTable;
