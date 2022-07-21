import React from "react";
import { BsHeart } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

interface CommentCardProps {
  fullName: string;
  createdAt: Date;
  comment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  createdAt,
  fullName,
}) => {
  const date = dateFormat(createdAt, "dd mmmm 'at' HH:MM");
  return (
    <div className="flex mt-4">
      <div className="w-10 h-10 text-gray-700 rounded-full flex items-center justify-center font-bold mr-2">
        <FaUserCircle size={40} />
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-md p-4 w-fit">
          <div className="flex items-center space-x-3">
            <Link
              to="/user"
              className="font-poppins font-medium text-sm hover:underline"
            >
              {fullName}
            </Link>
            <p className="text-gray-400 text-xs">{date}</p>
          </div>
          <p className="text-gray-500">{comment}</p>
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
