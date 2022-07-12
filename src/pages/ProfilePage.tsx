import React from "react";
import { useAppSelector } from "../app/hooks";
import Container from "../components/Container";
import PostCard from "../components/PostCard";
import ProfileImage from "../components/ProfileImage";
import ProfileInfo from "../components/ProfileInfo";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import { selectPosts } from "../features/post/postSlice";

const ProfilePage = () => {
  const posts = useAppSelector(selectPosts);
  return (
    <>
      <ProfileImage />
      <Container className="-translate-y-[100px]">
        <ProfileInfo />
        <CardSide>
          <CardSideButton text="Tweets" active />
          <CardSideButton text="Tweets & replies" />
          <CardSideButton text="Media" />
          <CardSideButton text="Likes" />
        </CardSide>
        <section className="col-span-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              sender={post.sender}
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
