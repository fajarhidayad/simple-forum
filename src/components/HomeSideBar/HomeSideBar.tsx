import React from "react";
import Card from "../Card";
import HashtagTrend from "./HashtagTrend";
import RecommendFollow from "./RecommendFollow";

const HomeSideBar = () => {
  return (
    <>
      <Card title="Trends for you">
        <HashtagTrend text="programming" total={895} />
        <HashtagTrend text="frontend" total={578} />
        <HashtagTrend text="laugh" total={187} />
      </Card>
      <Card title="Who to follow">
        <RecommendFollow
          name="Bruce Wayne"
          followers={989}
          description="Millionaire, Playboy, Batman"
        />
        <RecommendFollow
          name="Tony Stark"
          followers={899}
          description="Iron Man | Millionaire, Playboy, Philantropist"
        />
      </Card>
    </>
  );
};

export default HomeSideBar;
