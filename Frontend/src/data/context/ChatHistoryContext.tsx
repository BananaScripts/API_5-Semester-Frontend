import React, { createContext, useState, useContext } from 'react';
import { Bot } from '../bots/bots';

type ChatHistoryContextType = {
  chatHistory: Bot[];
  addChatToHistory: (bot: Bot) => void;
};

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

interface ChatHistoryProviderProps {
  children: React.ReactNode;
}

export const ChatHistoryProvider: React.FC<ChatHistoryProviderProps> = ({ children }) => {
  const [chatHistory, setChatHistory] = useState<Bot[]>([]);

  const addChatToHistory = (bot: Bot) => {
    setChatHistory((prevHistory) => {
      const existingBot = prevHistory.find((b) => b.id === bot.id);
      if (existingBot) {
        return [bot, ...prevHistory.filter((b) => b.id !== bot.id)];
      }
      return [bot, ...prevHistory];
    });
  };

  return (
    <ChatHistoryContext.Provider value={{ chatHistory, addChatToHistory }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
};