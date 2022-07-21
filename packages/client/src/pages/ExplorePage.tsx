import Container from "../components/Container";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import SearchInput from "../components/SearchInput";
import TweetCard from "../components/TweetCard";
import { trpc } from "../utils/trpc";

const ExplorePage = () => {
  const tweets = trpc.useQuery(["tweet.getAll"]).data;

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
        {tweets ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
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
