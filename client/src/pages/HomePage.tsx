import React from "react";
import PostCard from "../components/PostCard";
import TweetBox from "../components/TweetBox";
import { useAppSelector } from "../app/hooks";
import { selectPosts } from "../features/post/postSlice";
import Container from "../components/Container";
import HomeSideBar from "../components/HomeSideBar";
import Card from "../components/Card";

const HomePage = () => {
  const posts = useAppSelector(selectPosts);
  return (
    <Container>
      <section className="col-span-2">
        <TweetBox />
        {posts.map((post) => (
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
