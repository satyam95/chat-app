import { Contact } from "@/types";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import ContactCard from "./ContactCard";
import useGetOtherUsers from "@/hooks/useGetOtherUsers";
import { useAppSelector } from "@/redux/hooks";

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  selectedContact: Contact | null;
}

const ContactList = ({
  onSelectContact,
  selectedContact,
}: ContactListProps) => {
  useGetOtherUsers();
  const { otherUsers } = useAppSelector((state) => state.user);
  if (!otherUsers) return;
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
          {otherUsers.map((contact: Contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              isSelected={selectedContact?._id === contact._id}
              onClick={() => onSelectContact(contact)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactList;
