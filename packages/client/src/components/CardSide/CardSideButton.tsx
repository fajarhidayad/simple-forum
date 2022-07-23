import React from "react";

interface CardSideButtonProps {
  active?: boolean;
  text: string;
  onClick?: () => void;
}

const CardSideButton = ({ active, text, onClick }: CardSideButtonProps) => {
  const activeState = active
    ? "border-l-blue-500 text-blue-500"
    : "text-gray-600 border-l-transparent";
  return (
    <button
      onClick={onClick}
      className={`block font-poppins font-semibold px-6 py-2 my-2 border-l-4 hover:border-l-blue-500 transition-all duration-200 ${activeState}`}
    >
      {text}
    </button>
  );
};

export default CardSideButton;
