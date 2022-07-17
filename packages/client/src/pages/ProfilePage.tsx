import { useState } from "react";
import Container from "../components/Container";
import PostCard from "../components/PostCard";
import ProfileImage from "../components/ProfileImage";
import ProfileInfo from "../components/ProfileInfo";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import Overlay from "../components/Overlay";
import { trpc } from "../utils/trpc";

const ProfilePage = () => {
  const [overlay, setOverlay] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState("");

  // const posts = useAppSelector(selectPosts);
  const {
    data: posts,
    error,
    isError,
    isLoading,
  } = trpc.useQuery(["post.getAll"]);
  const loadingState = isLoading && <h1>Loading...</h1>;
  const errorState = isError && <h1>{error.message}</h1>;

  const showOverlay = (type: string) => {
    setOverlayTitle(type);
    setOverlay(true);
  };

  return (
    <>
      <Overlay
        active={overlay}
        onCloseFn={() => setOverlay(false)}
        title={overlayTitle}
      />
      <ProfileImage />
      <Container className="-translate-y-[100px]">
        <ProfileInfo showOverlayFn={showOverlay} />
        <CardSide>
          <CardSideButton text="Tweets" active />
          <CardSideButton text="Tweets & replies" />
          <CardSideButton text="Media" />
          <CardSideButton text="Likes" />
        </CardSide>
        <section className="col-span-2">
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
      </Container>
    </>
  );
};

export default ProfilePage;
