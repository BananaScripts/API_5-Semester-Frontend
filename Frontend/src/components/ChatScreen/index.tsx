import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { Bot } from '../../services/chatService';
import { useChatHistory } from '../../data/context/ChatHistoryContext';
import { styles } from './style';
import useAuth from "../../Hooks/useAuth";

type RootStackParamList = {
  ChatScreen: {
    bot: Bot;
    userId: string;
  };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

type Message = {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: string;
};

export default function ChatScreen() {
  const { bot } = useRoute<ChatScreenRouteProp>().params;
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { user } = useAuth();
  const userId = user?.user_id;
  const { addChatToHistory } = useChatHistory();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false); // Mover para dentro do componente
  const wsRef = useRef<WebSocket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const loadChatHistory = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/Chat/${id}`);
      setMessages(response.data.messages.map((msg: any) => ({
        sender: msg.sender === 'user' ? 'user' : 'bot',
        text: msg.text,
      })));
    } catch (error) {
      console.warn('Histórico não carregado.');
    } finally {
      setLoading(false);
    }
  }, []);

  const initializeChat = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      // Criar chat
      const createRes = await api.post(
        '/Chat',
        `"${userId}"`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatId(createRes.data.id);

      // Configurar WebSocket
      const wsUrl = `ws://10.0.2.2:7254/ws/chat/${userId}?agentId=${bot.id}&token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('Conexão estabelecida!');
        setIsConnected(true); // Atualizar estado de conexão
      };

      ws.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: response.text },
          ]);
        } catch (error) {
          console.error('Erro na mensagem:', error);
        }
      };

      ws.onerror = (error) => {
        Alert.alert('Erro', 'Conexão falhou');
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;
    } catch (error: any) {
      console.error('Erro na inicialização:', error);
      Alert.alert('Erro', 'Falha ao iniciar chat');
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        
      }
    }
  }, [userId, bot.id, navigation]);

  useEffect(() => {
    initializeChat();
    return () => wsRef.current?.close();
  }, [initializeChat]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatId || !wsRef.current) return;

    try {
      setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
      setInputText('');

      // Enviar apenas o texto via WS
      wsRef.current.send(inputText);

      await api.post(`/Chat/${chatId}/messages?agentId=${bot.id}`, {
        Sender: 'user',
        Text: inputText,
      });
    } catch (error) {
      Alert.alert('Erro', 'Mensagem não enviada');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Preparando conversa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={bot.image} style={styles.botImage} />
        <Text style={styles.botName}>{bot.name}</Text>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={message.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
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
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}