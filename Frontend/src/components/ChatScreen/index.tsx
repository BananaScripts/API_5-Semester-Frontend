import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, RouteProp, ParamListBase } from '@react-navigation/native';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { Bot } from '../../data/bots/bots';
import { useChatHistory } from '../../data/context/ChatHistoryContext';

type ChatScreenRouteProp = RouteProp<{ ChatScreen: { bot: Bot } }, 'ChatScreen'>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const { bot } = route.params;
  const navigation = useNavigation();
  const { addChatToHistory } = useChatHistory();
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
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