import { useState } from "react";
import Container from "../components/Container";
import TweetCard from "../components/TweetCard";
import ProfileImage from "../components/ProfileImage";
import ProfileInfo from "../components/ProfileInfo";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import Overlay from "../components/Overlay";
import { trpc } from "../utils/trpc";

const ProfilePage = () => {
  const [overlay, setOverlay] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState("");

  const {
    data: tweets,
    error,
    isError,
    isLoading,
  } = trpc.useQuery(["tweet.getAll"]);
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
      </Container>
    </>
  );
};

export default ProfilePage;
