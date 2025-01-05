import { cn } from "@/lib/utils";
import { Contact } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactCard = ({ contact, isSelected, onClick  }: ContactCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        isSelected ? 'bg-muted/80' : 'hover:bg-muted/40',
      )}
        onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
            contact.status === "online" ? "bg-green-500" : "bg-muted-foreground"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium truncate">{contact.name}</p>
          <span className="text-xs text-muted-foreground shrink-0 ml-2">
            {contact.lastMessageTime}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {contact.lastMessage}
        </p>
      </div>
      {contact.unreadCount > 0 && (
        <Badge
          variant="secondary"
          className="rounded-full h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground"
        >
          {contact.unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default ContactCard;
