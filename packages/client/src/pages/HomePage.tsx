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
    <h1 className="text-xl text-red-500 text-center">{error.message}</h1>
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
              id={tweet.id}
              fullName={`${tweet.User.firstName} ${tweet.User.lastName}`}
              username={tweet.User.username}
              createdAt={tweet.createdAt}
              text={tweet.text}
            />
          ))}
      </section>
      <section className="hidden md:block col-span-1 md:sticky md:top-24">
        <HomeSideBar />
      </section>
    </Container>
  );
};

export default HomePage;
