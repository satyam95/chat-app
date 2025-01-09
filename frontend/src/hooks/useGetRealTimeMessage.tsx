import { useEffect } from "react";
import { setMessages } from "../redux/messageSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSocket } from "@/context/socketContext";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const useGetRealTimeMessage = () => {
  const socket = useSocket();
  const { messages } = useAppSelector((store) => store.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: Message) => {
        dispatch(setMessages([...(messages || []), newMessage]));
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [dispatch, socket, messages]);
};

export default useGetRealTimeMessage;
