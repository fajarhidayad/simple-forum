import React from "react";

const SkeletonTweetCard = () => {
  return (
    <article className="bg-white rounded-lg py-4 px-5 shadow-sm mx-auto mb-5">
      <div className="flex">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold mr-2 animate-pulse"></div>
        <div>
          <div className="w-44 h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
          <div className="w-20 h-[16px] bg-gray-200 animate-pulse rounded-sm mt-2"></div>
        </div>
      </div>
      <div className="mt-4 w-full h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
      <div className="mt-4 w-full h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
      <div className="mt-4 w-full h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
      <div className="flex justify-end space-x-3 text-xs text-gray-400 mt-4">
        <div className="mt-4 w-[80px] h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
        <div className="mt-4 w-[80px] h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
        <div className="mt-4 w-[80px] h-[16px] bg-gray-200 animate-pulse rounded-sm"></div>
      </div>
    </article>
  );
};

export default SkeletonTweetCard;
