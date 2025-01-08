import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMessages } from "@/redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((store) => store.message);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...(messages || []), res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };

  return (
    <div className="p-4 border-t border-border">
      <form onSubmit={onSubmitHandler} className="flex gap-2 max-w-3xl mx-auto">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-muted/40"
        />
        <Button type="submit" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SendInput;
