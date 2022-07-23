import { useState } from "react";
import Container from "../components/Container";
import ProfileBackgroundImage from "../components/ProfileBackgroundImage";
import ProfileInfo from "../components/ProfileInfo";
import Overlay from "../components/Overlay";
import { trpc } from "../utils/trpc";
import { useLocation } from "react-router-dom";
import SkeletonProfileInfo from "../components/ProfileInfo/SkeletonProfileInfo";
import CardSideTab from "../layouts/CardSideTab";
import TweetsTab from "../layouts/TweetsTab";
import RepliesTab from "../layouts/RepliesTab";
import MediaTab from "../layouts/MediaTab";
import LikesTab from "../layouts/LikesTab";

enum Tab {
  Tweets,
  Replies,
  Media,
  Likes,
}

const ProfilePage = () => {
  const [tab, setTab] = useState<Tab>(Tab.Tweets);
  const [overlay, setOverlay] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState("");
  const username = useLocation().pathname.slice(1);

  const {
    data,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = trpc.useQuery(["user.getUserProfile", username]);

  const showOverlay = (type: string) => {
    setOverlayTitle(type);
    setOverlay(true);
  };

  const profileTab = [
    {
      text: "Tweets",
      isActive: tab === Tab.Tweets,
      onClick: () => setTab(Tab.Tweets),
    },
    {
      text: "Tweets & Replies",
      isActive: tab === Tab.Replies,
      onClick: () => setTab(Tab.Replies),
    },
    {
      text: "Media",
      isActive: tab === Tab.Media,
      onClick: () => setTab(Tab.Media),
    },
    {
      text: "Likes",
      isActive: tab === Tab.Likes,
      onClick: () => setTab(Tab.Likes),
    },
  ];

  return (
    <>
      <Overlay
        active={overlay}
        onCloseFn={() => setOverlay(false)}
        title={overlayTitle}
      />
      <ProfileBackgroundImage />
      <Container className="-translate-y-[100px]">
        {isLoadingUser ? (
          <SkeletonProfileInfo />
        ) : (
          <ProfileInfo
            showOverlayFn={showOverlay}
            name={data ? `${data.user.firstName} ${data.user.lastName}` : ""}
          />
        )}

        <section className="col-span-3 md:col-span-1 md:sticky md:top-48">
          <CardSideTab components={profileTab} />
        </section>
        <section className="col-span-2">
          {tab === Tab.Tweets && <TweetsTab username={username} />}
          {tab === Tab.Replies && <RepliesTab />}
          {tab === Tab.Media && <MediaTab />}
          {tab === Tab.Likes && <LikesTab username={username} />}
        </section>
      </Container>
    </>
  );
};

export default ProfilePage;
