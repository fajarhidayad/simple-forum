import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";

interface RecommendFollowProps {
  name: string;
  followers: number;
  description: string;
}

const RecommendFollow = ({
  name,
  followers,
  description,
}: RecommendFollowProps) => {
  return (
    <div className="border-b border-b-gray-300 py-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 text-gray-700 rounded-full flex items-center justify-center font-bold mr-3">
          <FaUserCircle size={40} />
        </div>
        <div className="mr-auto">
          <Link to="/user" className="font-semibold font-noto hover:underline">
            {name}
          </Link>
          <p>{followers} followers</p>
        </div>
        <button className="bg-blue-500 text-white rounded text-xs font-noto py-1 px-3 active:bg-blue-600 flex items-center">
          <MdPersonAdd className="mr-1" />
          Follow
        </button>
      </div>
      <p className="font-noto text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default RecommendFollow;
