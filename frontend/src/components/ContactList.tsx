import { Contact } from "@/types";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import ContactCard from "./ContactCard";

const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    lastMessage: "Hey, how are you?",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
    status: "online",
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    lastMessage: "Are we still meeting today?",
    lastMessageTime: "9:15 AM",
    unreadCount: 0,
    status: "offline",
  },
  {
    id: "3",
    name: "Carol White",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    lastMessage: "Thanks for your help!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    status: "online",
  },
];

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  selectedContact: Contact | null;
}

const ContactList = ({
  onSelectContact,
  selectedContact,
}: ContactListProps) => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-semibold mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts" className="pl-9 bg-muted/40" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {MOCK_CONTACTS.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              onClick={() => onSelectContact(contact)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactList;
