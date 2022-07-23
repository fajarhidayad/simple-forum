import React from "react";
import { trpc } from "../utils/trpc";
import TweetCard from "../components/TweetCard";
import SkeletonTweetCard from "../components/TweetCard/SkeletonTweetCard";

interface LikesTabProps {
  username?: string;
}

const LikesTab: React.FC<LikesTabProps> = ({ username }) => {
  const { data, isLoading, error, isError } = trpc.useQuery([
    "like.getUserLike",
    { username },
  ]);

  if (isLoading)
    return (
      <>
        <SkeletonTweetCard />
        <SkeletonTweetCard />
        <SkeletonTweetCard />
      </>
    );
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      {data &&
        data.map((item) => (
          <TweetCard
            key={item.id}
            username={item.User.username}
            createdAt={item.Tweet.createdAt}
            fullName={item.User.firstName + " " + item.User.lastName}
            id={item.id}
            text={item.Tweet.text}
          />
        ))}
    </div>
  );
};

export default LikesTab;
