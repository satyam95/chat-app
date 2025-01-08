import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of an individual other user
interface OtherUser {
  _id: string;
  fullName: string;
  username: string;
  profilePhoto: string;
  gender: "male" | "female" | "other";
  createdAt: string;
  updatedAt: string;
}

// Define the structure of the auth user
interface AuthUser {
  _id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
}

// Define the shape of the state
interface UserState {
  authUser: AuthUser | null;
  otherUsers: OtherUser[] | null;
  selectedUser: OtherUser | null;
}

// Initial state with defined types
const initialState: UserState = {
  authUser: null,
  otherUsers: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action: PayloadAction<OtherUser[] | null>) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<OtherUser | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser } =
  userSlice.actions;
export default userSlice.reducer;
