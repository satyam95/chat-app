import { Contact } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MoreVertical, Phone, Video } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import MessageBubble from "./MessageBubble";
import { useAppSelector } from "@/redux/hooks";
import useGetMessages from "@/hooks/useGetMessages";
import SendInput from "./SendInput";
import useGetRealTimeMessage from "@/hooks/useGetRealTimeMessage";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatWindowProps {
  selectedContact: Contact | null;
}

const ChatWindow = ({ selectedContact }: ChatWindowProps) => {
  useGetMessages();
  useGetRealTimeMessage();

  const { messages } = useAppSelector((store) => store.message) as {
    messages: Message[] | null;
  };

  const validMessages = (messages || []).filter(
    (message): message is Message => !!message && typeof message._id === "string"
  );

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/5">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Welcome to Messages</h3>
          <p className="text-muted-foreground">
            Select a contact to start chatting
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={selectedContact.profilePhoto}
              alt={selectedContact.fullName}
            />
            <AvatarFallback>
              {selectedContact.fullName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedContact.fullName}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Clear Chat</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Block Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {validMessages.map((message) => (
            <MessageBubble key={message._id} data={message} />
          ))}
        </div>
      </ScrollArea>
      <SendInput />
    </div>
  );
};

export default ChatWindow;
