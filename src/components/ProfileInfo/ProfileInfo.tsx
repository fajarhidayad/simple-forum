import React from "react";
import { MdPersonAdd } from "react-icons/md";

const ProfileInfo = () => {
  return (
    <div className="bg-white rounded-lg min-h-[163px] shadow p-6 col-span-3">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left md:items-start space-y-3 md:space-y-0">
        <div className="w-[120px] h-[120px] bg-gray-500 rounded-full mr-6"></div>
        <div className="md:mr-auto flex flex-col">
          <div className="flex flex-col md:flex-row md:space-x-6 items-center">
            <h3 className="text-2xl font-poppins font-semibold">
              Jack Sparrow
            </h3>
            <div className="flex justify-between space-x-6 mt-3 md:mt-0">
              <p className="text-sm font-poppins font-medium text-gray-400">
                <span className="font-semibold text-gray-600">102</span>{" "}
                Following
              </p>
              <p className="text-sm font-poppins font-medium text-gray-400">
                <span className="font-semibold text-gray-600">15,2k</span>{" "}
                Followers
              </p>
            </div>
          </div>
          <p className="text-lg font-noto mt-3 text-gray-500 max-w-[500px]">
            Captain of Black Pearl Pirates 🚩
          </p>
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 font-noto text-xs flex items-center rounded active:bg-blue-600">
          <MdPersonAdd className="mr-1 text-base" />
          Follow
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
