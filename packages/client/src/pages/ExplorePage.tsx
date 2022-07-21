import Container from "../components/Container";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import SearchInput from "../components/SearchInput";
import TweetCard from "../components/TweetCard";
import { trpc } from "../utils/trpc";
import SkeletonTweetCard from "../components/TweetCard/SkeletonTweetCard";

const ExplorePage = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    error,
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
      <section className="col-span-1">
        <CardSide>
          <CardSideButton text="Top" active />
          <CardSideButton text="Latest" />
          <CardSideButton text="People" />
          <CardSideButton text="Media" />
        </CardSide>
      </section>
      <section className="col-span-2">
        <SearchInput />
        {loadingState}
        {errorState}
        {tweets ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              id={tweet.id}
              fullName={`${tweet.user.firstName} ${tweet.user.lastName}`}
              username={tweet.user.username}
              text={tweet.text}
              createdAt={tweet.createdAt}
            />
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </section>
    </Container>
  );
};

export default ExplorePage;
