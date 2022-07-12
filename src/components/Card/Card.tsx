import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-5">
      <h4 className="text-lg text-gray-600 font-semibold border-b border-b-gray-300 pb-2">
        {title}
      </h4>
      {children}
    </div>
  );
};

export default Card;
