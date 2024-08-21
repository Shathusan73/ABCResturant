import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusSquare } from 'react-icons/fa';
import { RxSlash } from 'react-icons/rx';
import CategoriesTable from '../../../components/CategoriesTable';

function AllCategory() {
 
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <nav className="my-2">
        <ol className="flex text-[#ff2626]">
          <li className="flex items-center">
            <a href="/">Home</a>
            <RxSlash />
          </li>
          <li className="flex items-center text-[#2a1472]">
            <span>Categories</span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/create-category">
        <button
          type="button"
          className="text-white bg-[#360909] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <FaPlusSquare />
          Create Category
        </button>
      </a>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
        
        <CategoriesTable/>
      </div>

      
      
    </div>
  );
}

export default AllCategory;
