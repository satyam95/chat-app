import { useEffect } from "react";
import { setMessages } from "../redux/messageSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const useGetRealTimeMessage = () => {
  const { socket } = useAppSelector((store) => store.socket);
  const { messages } = useAppSelector((store) => store.message);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
        dispatch(setMessages([...(messages || []), newMessage]));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [setMessages, messages]);
};

export default useGetRealTimeMessage;
