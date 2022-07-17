import React from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

const CommentCard = () => {
  return (
    <div className="flex mt-4">
      <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
        IMG
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-md p-4">
          <div className="flex items-center space-x-3">
            <Link
              to="/user"
              className="font-poppins font-medium text-sm hover:underline"
            >
              Johnny Depp
            </Link>
            <p className="text-gray-400 text-xs">8 July at 20:37</p>
          </div>
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, eum nisi assumenda itaque eius animi.
          </p>
        </div>
        <div className="flex mt-2 text-gray-500 text-xs items-center space-x-2">
          <button className="flex items-center space-x-2 font-noto">
            <BsHeart /> <span>Like</span>
          </button>
          <span>&bull;</span>
          <p>10 Likes</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
