// src/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userID: string | null;
  username: string | null;
  email: string | null;
  role: "student" | "teacher" | "administrator" | null;
  languagePreference: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userID: null,
  username: null,
  email: null,
  role: null,
  languagePreference: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userID = action.payload.userID;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.languagePreference = action.payload.languagePreference;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userID = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.languagePreference = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
