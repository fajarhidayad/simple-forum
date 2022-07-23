import { useState } from "react";
import Container from "../components/Container";
import CardSideTab from "../layouts/CardSideTab";
import LikesTab from "../layouts/LikesTab";
import RepliesTab from "../layouts/RepliesTab";
import TweetsTab from "../layouts/TweetsTab";
import MediaTab from "../layouts/MediaTab";

enum Tab {
  Tweets,
  Replies,
  Media,
  Likes,
}

const BookmarkPage = () => {
  const [tab, setTab] = useState<Tab>(Tab.Tweets);

  const bookmarkTab = [
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
    <Container>
      <section className="col-span-1 md:sticky md:top-24">
        <CardSideTab components={bookmarkTab} />
      </section>
      <section className="col-span-2">
        {tab === Tab.Tweets && <TweetsTab />}
        {tab === Tab.Replies && <RepliesTab />}
        {tab === Tab.Media && <MediaTab />}
        {tab === Tab.Likes && <LikesTab />}
      </section>
    </Container>
  );
};

export default BookmarkPage;
