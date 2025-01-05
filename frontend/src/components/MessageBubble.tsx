import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: {
    content: string;
    timestamp: string;
    sender: "me" | "them";
  };
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.sender === "me";
  return (
    <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isMe
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted/40 text-foreground rounded-bl-sm"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={cn(
            "text-[10px] mt-1",
            isMe ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
