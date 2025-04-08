import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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

  useEffect(() => {
    addChatToHistory(bot);
  }, [bot]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'user', text: inputText }]);
      handleBotResponse(inputText);
      setInputText('');
    }
  };

  const handleBotResponse = (userMessage: string) => {
    const botResponse = bot.response(userMessage);
    setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image style={styles.botImage} source={bot.image} />
        <Text style={styles.botName}>{bot.id}</Text>
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
