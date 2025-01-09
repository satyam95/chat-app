import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMessages } from "@/redux/messageSlice";
import axios from "axios";
import { useEffect } from "react";

const useGetMessages = () => {
  const { selectedUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedUser?._id) {
      return;
    }

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser._id}`
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
