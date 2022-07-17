import React from "react";
import { Link } from "react-router-dom";

interface HashtagTrendProps {
  text: string;
  total: number;
}

const HashtagTrend = ({ text, total }: HashtagTrendProps) => {
  return (
    <div className="py-2 px-1 my-1 hover:bg-gray-100 transition-all duration-100">
      <Link to="/programming">
        <h3 className="font-noto font-semibold text-xl">#{text}</h3>
        <p className="text-xs font-noto text-gray-400 mt-2">{total} Tweets</p>
      </Link>
    </div>
  );
};

export default HashtagTrend;
