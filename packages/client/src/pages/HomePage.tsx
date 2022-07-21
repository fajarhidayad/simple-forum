import TweetCard from "../components/TweetCard";
import TweetBox from "../components/TweetBox";
import Container from "../components/Container";
import HomeSideBar from "../components/HomeSideBar";
import { trpc } from "../utils/trpc";
import SkeletonTweetCard from "../components/TweetCard/SkeletonTweetCard";

const HomePage = () => {
  const {
    data: tweets,
    error,
    isError,
    isLoading,
  } = trpc.useQuery(["tweet.getAll"]);

  const loadingState = isLoading && (
    <>
      <SkeletonTweetCard />
      <SkeletonTweetCard />
      <SkeletonTweetCard />
    </>
  );
  const errorState = isError && (
    <h1 className="text-xl text-red-500">{error.message}</h1>
  );

  return (
    <Container>
      <section className="col-span-2">
        <TweetBox />
        {loadingState}
        {errorState}
        {tweets &&
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              fullName={`${tweet.user.firstName} ${tweet.user.lastName}`}
              username={tweet.user.username}
              createdAt={tweet.createdAt}
              text={tweet.text}
            />
          ))}
      </section>
      <section className="hidden md:block col-span-1">
        <HomeSideBar />
      </section>
    </Container>
  );
};

export default HomePage;
