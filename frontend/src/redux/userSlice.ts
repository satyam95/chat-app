import { AuthUser, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  authUser: AuthUser | null;
  otherUsers: User[] | null;
  selectedUser: User | null;
  onlineUsers: string[] | null;
}

const initialState: UserState = {
  authUser: null,
  otherUsers: null,
  selectedUser: null,
  onlineUsers: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action: PayloadAction<User[] | null>) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action: PayloadAction<string[] | null>) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
