import { cn } from "@/lib/utils";
import { Contact } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
          <AvatarImage src={contact.profilePhoto} alt={contact.fullName} />
          <AvatarFallback>{contact.fullName.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium truncate">{contact.fullName}</p>
          {/* <span className="text-xs text-muted-foreground shrink-0 ml-2">
            {contact.lastMessageTime}
          </span> */}
        </div>
        {/* <p className="text-sm text-muted-foreground truncate">
          {contact.lastMessage}
        </p> */}
      </div>
    </div>
  );
};

export default ContactCard;
