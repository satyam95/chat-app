import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setOnlineUsers } from "./redux/userSlice";
import { useSocket } from "./context/socketContext";

function App() {
  const { authUser } = useAppSelector((store) => store.user);
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authUser && socket) {
      socket.emit("userConnected", { userId: authUser._id });

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socket.off("getOnlineUsers"); 
      };
    }
  }, [authUser, socket, dispatch]);

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
