import ChatWindow from "@/components/ChatWindow";
import ContactList from "@/components/ContactList";
import { useAppSelector } from "@/redux/hooks";

const Home = () => {
  const { selectedUser } = useAppSelector((state) => state.user);
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:block w-[350px] border-r border-border">
        <ContactList />
      </div>
      <ChatWindow selectedContact={selectedUser} />
    </div>
  );
};

export default Home;
