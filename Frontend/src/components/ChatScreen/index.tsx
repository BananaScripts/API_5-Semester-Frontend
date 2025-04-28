import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Bot } from '../../data/bots/bots';
import { useChatHistory } from '../../data/context/ChatHistoryContext';

type RootStackParamList = {
  ChatScreen: { bot: Bot };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

interface ChatScreenProps {
  route: ChatScreenRouteProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { bot } = route.params;
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { addChatToHistory } = useChatHistory();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  // Corrected API URL
  const chatApiUrl = 'http://localhost:7254/api/Chat';

  // Fetch chat history when the component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${chatApiUrl}/${bot.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
    addChatToHistory(bot);
  }, [bot]);

  // Handle sending a message
  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = { sender: 'user', text: inputText };

      // Optimistically update the UI
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');

      try {
        const response = await fetch(`${chatApiUrl}/${bot.id}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userMessage),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const botResponse = await response.json();
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse.text }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Handle deleting the chat
  const handleDeleteChat = async () => {
    try {
      const response = await fetch(`${chatApiUrl}/${bot.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      navigation.goBack(); // Navigate back after deleting the chat
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando mensagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image style={styles.botImage} source={bot.image} />
        <Text style={styles.botName}>{bot.id}</Text>
        <TouchableOpacity onPress={() => handleDeleteChat()} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {messages.map((message, index) => (
          <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
