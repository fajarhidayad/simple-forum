import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface User {
  email: string;
  token: string;
}

interface UserState {
  userInfo: User | undefined;
}

const userInfoFromStorage = JSON.parse(
  localStorage.getItem("user-info") as string
);

const initialState: UserState = { userInfo: userInfoFromStorage } || {
  userInfo: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<User>) {
      state.userInfo = action.payload;
      localStorage.setItem("user-info", JSON.stringify(action.payload));
    },
    signOut(state) {
      localStorage.removeItem("user-info");
      state.userInfo = undefined;
    },
  },
});

export const getUserInfo = (state: RootState) => state.auth.userInfo;
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
