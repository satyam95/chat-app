import { LogOut, Search } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import ContactCard from "./ContactCard";
import useGetOtherUsers from "@/hooks/useGetOtherUsers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthUser, setOtherUsers, setSelectedUser } from "@/redux/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setMessages } from "@/redux/messageSlice";
import { User } from "@/types";

const ContactList = () => {
  useGetOtherUsers();
  const dispatch = useAppDispatch();
  const { otherUsers, selectedUser, authUser } = useAppSelector(
    (state) => state.user
  );
  const selectedUserHandler = (contact: User) => {
    dispatch(setSelectedUser(contact));
  };

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };

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
          {otherUsers.map((contact: User) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              isSelected={selectedUser?._id === contact._id}
              onClick={() => selectedUserHandler(contact)}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={authUser?.profilePhoto}
                alt={authUser?.fullName}
              />
              <AvatarFallback>{authUser?.fullName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{authUser?.fullName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {authUser?.username}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={logoutHandler}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
