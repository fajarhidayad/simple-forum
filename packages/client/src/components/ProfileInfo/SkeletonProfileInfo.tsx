import React from "react";

const SkeletonProfileInfo = () => {
  return (
    <div className="bg-white rounded-lg min-h-[163px] shadow p-6 col-span-3">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 md:items-start space-y-3 md:space-y-0">
        <div className="w-[120px] h-[120px] bg-gray-300 rounded-full flex items-center justify-center font-bold animate-pulse"></div>
        <div className="md:mr-auto flex flex-col">
          <div className="flex flex-col md:flex-row md:space-x-6 items-center">
            <div className="w-32 h-6 bg-gray-300 animate-pulse font-poppins font-semibold rounded-sm"></div>
            <div className="flex justify-between space-x-6 mt-3 md:mt-0">
              <div className="h-3 w-24 bg-gray-300 flex space-x-1 items-baseline animate-pulse rounded-sm"></div>
              <div className="h-3 w-24 bg-gray-300 flex space-x-1 items-baseline animate-pulse rounded-sm"></div>
            </div>
          </div>
          <div className="h-4 font-noto mt-3 bg-gray-300 w-full animate-pulse"></div>
          <div className="h-4 font-noto mt-3 bg-gray-300 w-full animate-pulse"></div>
          <div className="h-4 font-noto mt-3 bg-gray-300 w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileInfo;
