import React from "react";

interface ButtonActionProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const ButtonAction = ({ icon, text, onClick }: ButtonActionProps) => {
  return (
    <button
      className="text-sm flex items-center space-x-2 rounded-md hover:bg-gray-100 py-3 px-5 transition-all duration-200"
      onClick={onClick}
    >
      {icon} <span>{text}</span>
    </button>
  );
};

export default ButtonAction;
