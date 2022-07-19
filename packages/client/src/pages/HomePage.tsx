import TweetCard from "../components/TweetCard";
import TweetBox from "../components/TweetBox";
import Container from "../components/Container";
import HomeSideBar from "../components/HomeSideBar";
import { trpc } from "../utils/trpc";

const HomePage = () => {
  const {
    data: tweets,
    error,
    isError,
    isLoading,
  } = trpc.useQuery(["tweet.getAll"], { retryOnMount: true });

  const loadingState = isLoading && <h1>Loading...</h1>;
  const errorState = isError && <h1>{error.message}</h1>;

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
              sender={tweet.user.username}
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
