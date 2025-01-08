import ChatWindow from "@/components/ChatWindow";
import ContactList from "@/components/ContactList";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { selectedUser, authUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
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
