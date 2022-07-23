import React from "react";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";

interface CardSideTabProps {
  components: {
    text: string;
    isActive: boolean;
    onClick: () => void;
  }[];
}

const CardSideTab: React.FC<CardSideTabProps> = ({ components }) => {
  return (
    <CardSide>
      {components.map((item) => (
        <CardSideButton
          key={item.text}
          text={item.text}
          active={item.isActive}
          onClick={item.onClick}
        />
      ))}
    </CardSide>
  );
};

export default CardSideTab;
