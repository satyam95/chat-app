import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import io, { Socket } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

function App() {
  const { authUser } = useAppSelector((store) => store.user);
  const socket = useAppSelector((store) => store.socket.socket); // Access the socket from the correct path
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authUser) {
      const newSocket: Socket = io("http://localhost:8080", {
        query: { userId: authUser._id },
      });

      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Return a cleanup function to close the socket
      return () => {
        newSocket.close();
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [authUser]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
