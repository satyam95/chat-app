import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
interface SocketState {
  socket: any | null; // Use `any` for compatibility with WritableDraft
}

// Initial state
const initialState: SocketState = {
  socket: null,
};

// Create the slice
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<any | null>) => {
      state.socket = action.payload;
    },
  },
});

// Export actions and reducer
export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
