import PostCard from "../components/PostCard";
import TweetBox from "../components/TweetBox";
import { useAppSelector } from "../app/hooks";
import Container from "../components/Container";
import HomeSideBar from "../components/HomeSideBar";
import { trpc } from "../utils/trpc";

const HomePage = () => {
  // const posts = useAppSelector(selectPosts);

  const {
    data: posts,
    error,
    isError,
    isLoading,
  } = trpc.useQuery(["post.getAll"]);

  const loadingState = isLoading && <h1>Loading...</h1>;
  const errorState = isError && <h1>{error.message}</h1>;

  return (
    <Container>
      <section className="col-span-2">
        <TweetBox />
        {loadingState}
        {errorState}
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              sender={post.user}
              createdAt={post.createdAt}
              content={post.content}
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
