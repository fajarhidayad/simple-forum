import React from "react";
import CardSideButton from "./CardSideButton";

interface CardSideProps {
  children?: React.ReactNode;
}

const CardSide = ({ children }: CardSideProps) => {
  return (
    <div className="bg-white shadow rounded-lg py-4 col-span-3 md:col-span-1">
      {children}
    </div>
  );
};

export default CardSide;
