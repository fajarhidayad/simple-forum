import React from "react";
import Container from "../components/Container";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import SearchInput from "../components/SearchInput";
import { useAppSelector } from "../app/hooks";
import { selectPosts } from "../features/post/postSlice";
import PostCard from "../components/PostCard";

const ExplorePage = () => {
  const posts = useAppSelector(selectPosts);

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
        {posts.map((post) => (
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

export default ExplorePage;
