import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface Post {
  id: string;
  user: string;
  createdAt: number;
  content: string;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [
    {
      id: `${+new Date()}`,
      user: "Johnny Depp",
      createdAt: Date.now(),
      content: "I'm Jack Sparrow",
    },
    // {
    //   id: `${+new Date()}`,
    //   sender: "Daniel Radcliffe",
    //   date: new Date(),
    //   content: "I'm Harry Potter",
    // },
  ],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { addPost } = postSlice.actions;
export const selectPosts = (state: RootState) => state.post.posts;

export default postSlice.reducer;
