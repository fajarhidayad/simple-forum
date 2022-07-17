import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <div className="rounded-lg bg-white shadow p-3 flex items-center text-gray-500 mb-5">
      <label htmlFor="search" className="mr-3 text-xl">
        <IoMdSearch />
      </label>
      <input
        type="text"
        placeholder="Search"
        id="search"
        name="search"
        className="focus:ring-0 focus:outline-none flex-1"
      />
      <button className="bg-blue-500 text-white py-2 px-6 rounded text-xs active:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
