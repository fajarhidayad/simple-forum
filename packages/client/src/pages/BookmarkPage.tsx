import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import Container from "../components/Container";
import PostCard from "../components/PostCard";
import { trpc } from "../utils/trpc";

const BookmarkPage = () => {
  // const posts = useAppSelector(selectPosts);
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(["post.getAll"]);

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
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              sender={post.user}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
      </section>
    </Container>
  );
};

export default BookmarkPage;
