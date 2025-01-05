export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    status: 'online' | 'offline';
  }
  
  export interface Message {
    id: string;
    content: string;
    timestamp: string;
    sender: 'me' | 'them';
  }