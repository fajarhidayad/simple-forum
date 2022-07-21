import { useState } from "react";
import Container from "../components/Container";
import TweetCard from "../components/TweetCard";
import ProfileBackgroundImage from "../components/ProfileBackgroundImage";
import ProfileInfo from "../components/ProfileInfo";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import Overlay from "../components/Overlay";
import { trpc } from "../utils/trpc";
import { useLocation } from "react-router-dom";
import SkeletonTweetCard from "../components/TweetCard/SkeletonTweetCard";
import SkeletonProfileInfo from "../components/ProfileInfo/SkeletonProfileInfo";

const ProfilePage = () => {
  const [overlay, setOverlay] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState("");
  const username = useLocation().pathname.slice(1);

  const {
    data,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = trpc.useQuery(["user.getUserProfile", username]);

  const {
    data: tweets,
    error,
    isError,
    isLoading,
  } = trpc.useQuery(["tweet.getUserTweet", username]);
  const loadingState = isLoading && <h1>Loading...</h1>;
  const errorState = isError && (
    <h1 className="text-2xl text-center text-gray-500">{error.message}</h1>
  );

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
      <ProfileBackgroundImage />
      <Container className="-translate-y-[100px]">
        {isLoading ? (
          <SkeletonProfileInfo />
        ) : (
          <ProfileInfo
            showOverlayFn={showOverlay}
            name={data ? `${data.user.firstName} ${data.user.lastName}` : ""}
          />
        )}

        <CardSide>
          <CardSideButton text="Tweets" active />
          <CardSideButton text="Tweets & replies" />
          <CardSideButton text="Media" />
          <CardSideButton text="Likes" />
        </CardSide>
        <section className="col-span-2">
          {loadingState && (
            <>
              <SkeletonTweetCard />
              <SkeletonTweetCard />
            </>
          )}
          {errorState}
          {tweets &&
            tweets.map((tweet) => (
              <TweetCard
                key={tweet.id}
                id={tweet.id}
                fullName={`${tweet.user.firstName} ${tweet.user.lastName}`}
                username={tweet.user.username}
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
