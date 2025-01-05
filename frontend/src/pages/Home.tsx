import ChatWindow from "@/components/ChatWindow";
import ContactList from "@/components/ContactList";
import { Contact } from "@/types";
import { useState } from "react";

const Home = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:block w-[350px] border-r border-border">
        <ContactList
          onSelectContact={setSelectedContact}
          selectedContact={selectedContact}
        />
      </div>
      <ChatWindow selectedContact={selectedContact} />
    </div>
  );
};

export default Home;
