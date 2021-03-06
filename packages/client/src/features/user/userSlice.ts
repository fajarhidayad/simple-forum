import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const initialState: { user: User | undefined } = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const getUser = (state: RootState) => state.user;
export const { setInfo } = userSlice.actions;

export default userSlice.reducer;
