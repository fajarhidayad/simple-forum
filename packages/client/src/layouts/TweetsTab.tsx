import TweetCard from "../components/TweetCard";
import SkeletonTweetCard from "../components/TweetCard/SkeletonTweetCard";
import { trpc } from "../utils/trpc";

interface TweetsTabProps {
  username?: string;
}

const TweetsTab: React.FC<TweetsTabProps> = ({ username }) => {
  if (username) {
    return <ProfilePage username={username} />;
  }
  return <BookmarkPage />;
};

const ProfilePage = ({ username }: { username: string }) => {
  const {
    data: tweets,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(["tweet.getUserTweet", username]);

  const loadingState = isLoading && (
    <>
      <SkeletonTweetCard />
      <SkeletonTweetCard />
      <SkeletonTweetCard />
    </>
  );
  const errorState = isError && <h1>{error.message}</h1>;

  return (
    <>
      {loadingState}
      {errorState}
      {tweets &&
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            id={tweet.id}
            fullName={`${tweet.User.firstName} ${tweet.User.lastName}`}
            username={tweet.User.username}
            text={tweet.text}
            createdAt={tweet.createdAt}
          />
        ))}
    </>
  );
};

const BookmarkPage = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(["bookmark.getSavedTweets"]);

  const loadingState = isLoading && (
    <>
      <SkeletonTweetCard />
      <SkeletonTweetCard />
      <SkeletonTweetCard />
    </>
  );
  const errorState = isError && <h1>{error.message}</h1>;

  return (
    <>
      {loadingState}
      {errorState}
      {tweets &&
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            id={tweet.Tweet.id}
            fullName={`${tweet.User.firstName} ${tweet.User.lastName}`}
            username={tweet.User.username}
            text={tweet.Tweet.text}
            createdAt={tweet.Tweet.createdAt}
          />
        ))}
    </>
  );
};

export default TweetsTab;
