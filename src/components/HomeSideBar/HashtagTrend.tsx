import React from "react";

interface HashtagTrendProps {
  text: string;
  total: number;
}

const HashtagTrend = ({ text, total }: HashtagTrendProps) => {
  return (
    <div className="my-5">
      <h3 className="font-noto font-semibold text-xl">#{text}</h3>
      <p className="text-xs font-noto text-gray-400 mt-2">{total} Tweets</p>
    </div>
  );
};

export default HashtagTrend;
