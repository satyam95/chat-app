import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface MessageBubbleProps {
  data: Message;
}

const MessageBubble = ({ data }: MessageBubbleProps) => {
  const { message, createdAt } = data;
  const { authUser } = useAppSelector((store) => store.user);
  const scroll = useRef<HTMLDivElement | null>(null);

  const date = new Date(createdAt);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formattedTime = formatTime(date);

  const isMe = data.senderId === authUser?._id;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={cn("flex", isMe ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isMe
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted/40 text-foreground rounded-bl-sm"
        )}
      >
        <p className="text-sm">{message}</p>
        <p
          className={cn(
            "text-[10px] mt-1",
            isMe ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
