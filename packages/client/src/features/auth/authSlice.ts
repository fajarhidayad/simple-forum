import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const TOKEN = "token";

interface Auth {
  token: string;
}

interface AuthState {
  token: Auth | undefined;
}

const tokenFromStorage = JSON.parse(localStorage.getItem(TOKEN) as string);

const initialState: AuthState = { token: tokenFromStorage } || {
  userInfo: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<Auth>) {
      state.token = action.payload;
      localStorage.setItem(TOKEN, JSON.stringify(action.payload));
    },
    signOut(state) {
      localStorage.removeItem(TOKEN);
      state.token = undefined;
    },
  },
});

export const getToken = (state: RootState) => state.auth.token;
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
