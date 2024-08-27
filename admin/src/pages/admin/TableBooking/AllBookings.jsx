import React from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import { RxSlash } from 'react-icons/rx'
import BookingTable from '../../../components/Bookingtable'

function AllBookings() {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
    <nav className="my-2">
      <ol className="flex text-[#ff2626]">
        <li className="flex items-center">
          <a href="/">Home</a>
          <RxSlash />
        </li>
        <li className="flex items-center text-[#2a1472]">
          <span>Booking Table </span>
        </li>
      </ol>
    </nav>
    <hr />
    <a href="/create-table">
      <button
        type="button"
        className="text-white bg-[#360909] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <FaPlusSquare />
        Create Table Booking
      </button>
    </a>
    <div>
     <BookingTable/>
    </div>
    </div>
  )
}

export default AllBookings