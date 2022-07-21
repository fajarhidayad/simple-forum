import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import Container from "../components/Container";
import TweetCard from "../components/TweetCard";
import { trpc } from "../utils/trpc";

const BookmarkPage = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(["tweet.getAll"]);

  const loadingState = isLoading && <h1>Loading...</h1>;
  const errorState = isError && <h1>{error.message}</h1>;

  return (
    <Container>
      <section className="col-span-1">
        <CardSide>
          <CardSideButton text="Tweets" active />
          <CardSideButton text="Tweets & replies" />
          <CardSideButton text="Media" />
          <CardSideButton text="Likes" />
        </CardSide>
      </section>
      <section className="col-span-2">
        {loadingState}
        {errorState}
        {tweets &&
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              fullName={`${tweet.user.firstName} ${tweet.user.lastName}`}
              username={tweet.user.username}
              text={tweet.text}
              createdAt={tweet.createdAt}
            />
          ))}
      </section>
    </Container>
  );
};

export default BookmarkPage;
