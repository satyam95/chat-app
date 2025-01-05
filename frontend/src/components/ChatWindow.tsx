import { Contact } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MoreVertical, Phone, Send, Video } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import MessageBubble from "./MessageBubble";

type Message = {
    id: string;
    content: string;
    timestamp: string;
    sender: "me" | "them";
  };
  
  const MOCK_MESSAGES: Message[] = [
    {
      id: "1",
      content: "Hey, how are you?",
      timestamp: "10:30 AM",
      sender: "them",
    },
    {
      id: "2",
      content: "I'm good, thanks! How about you?",
      timestamp: "10:31 AM",
      sender: "me",
    },
    {
      id: "3",
      content: "Great! Do you want to grab lunch later?",
      timestamp: "10:32 AM",
      sender: "them",
    },
  ];
  

interface ChatWindowProps {
  selectedContact: Contact | null;
}

const ChatWindow = ({ selectedContact }: ChatWindowProps) => {
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
            <AvatarFallback>{selectedContact.fullName.slice(0, 2)}</AvatarFallback>
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
          {MOCK_MESSAGES.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <form className="flex gap-2 max-w-3xl mx-auto">
          <Input
            placeholder="Type a message..."
            className="flex-1 bg-muted/40"
          />
          <Button size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
