import React from "react";

interface ButtonActionProps {
  icon: React.ReactNode;
  text: string;
}

const ButtonAction = ({ icon, text }: ButtonActionProps) => {
  return (
    <button className="text-sm flex items-center space-x-2 rounded-md hover:bg-gray-100 py-3 px-5 transition-all duration-200">
      {icon} <span className="hidden md:block">{text}</span>
    </button>
  );
};

export default ButtonAction;
