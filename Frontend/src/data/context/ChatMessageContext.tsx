import React, { createContext, useContext, useState, ReactNode } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: string;
};

type ChatMessagesType = {
  [chatId: string]: Message[];
};

type ChatMessageContextType = {
  chatMessages: ChatMessagesType;
  addMessage: (chatId: string, message: Message) => void;
  getMessages: (chatId: string) => Message[];
  setMessages: (chatId: string, messages: Message[]) => void;
};

const ChatMessageContext = createContext<ChatMessageContextType | undefined>(undefined);

export const ChatMessageProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessagesType>({});

  const addMessage = (chatId: string, message: Message) => {
    setChatMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
  };

  const getMessages = (chatId: string) => {
    return chatMessages[chatId] || [];
  };

  const setMessages = (chatId: string, messages: Message[]) => {
    setChatMessages((prev) => ({
      ...prev,
      [chatId]: messages,
    }));
  };

  return (
    <ChatMessageContext.Provider value={{ chatMessages, addMessage, getMessages, setMessages }}>
      {children}
    </ChatMessageContext.Provider>
  );
};

export const useChatMessages = () => {
  const context = useContext(ChatMessageContext);
  if (!context) {
    throw new Error('useChatMessages precisa ser usado dentro de um ChatMessageProvider');
  }
  return context;
};
