import React from "react";
import { useAppSelector } from "../app/hooks";
import CardSide from "../components/CardSide";
import CardSideButton from "../components/CardSide/CardSideButton";
import Container from "../components/Container";
import PostCard from "../components/PostCard";
import { selectPosts } from "../features/post/postSlice";

const BookmarkPage = () => {
  const posts = useAppSelector(selectPosts);

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
        {posts.map((post) => (
          <PostCard
            key={post.id}
            sender={post.sender}
            content={post.content}
            createdAt={post.createdAt}
          />
        ))}
      </section>
    </Container>
  );
};

export default BookmarkPage;
