import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { Bot, getWebSocketUrl } from '../../services/chatService';
import { useChatHistory } from '../../data/context/ChatHistoryContext';
import { styles } from './style';
import { useChatMessages } from '../../data/context/ChatMessageContext';
import useAuth from '../../Hooks/useAuth';

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
  const { addMessage, getMessages, setMessages: setContextMessages } = useChatMessages();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const formatTime = (isoString: string | undefined) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    // Ajusta -3 horas manualmente
    date.setHours(date.getHours() - 3);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!bot || !userId) return;
    const existingMessages = getMessages(String(bot.agentId));
    if (existingMessages.length > 0) {
      setMessages(existingMessages);
      setLoading(false);
    }
  }, [bot, userId, getMessages]);

  const loadChatHistory = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/Chat/${id}`);
      const formattedMessages = response.data.messages.map((msg: any) => ({
        sender: msg.sender === 'user' ? 'user' : 'bot',
        text: msg.text,
        timestamp: msg.timestamp,
      }));
      setMessages(formattedMessages);
      setContextMessages(String(bot.agentId), formattedMessages);
    } catch (error) {
      console.warn('Histórico não carregado.');
    } finally {
      setLoading(false);
    }
  }, [bot.agentId, setContextMessages]);

  const initializeChat = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      const existingChatRes = await api.get(
        `/Chat/user/${userId}/agent/${bot.agentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(() => null);

      let activeChatId;

      if (existingChatRes && existingChatRes.data?.id) {
        activeChatId = existingChatRes.data.id;
        console.log('Chat existente encontrado:', activeChatId);
      } else {
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
        activeChatId = createRes.data.id;
        console.log('Novo chat criado:', activeChatId);
      }

      setChatId(activeChatId);
      await loadChatHistory(activeChatId);

      const wsUrl = getWebSocketUrl(activeChatId);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('🔥 Conexão WebSocket ON 🔥');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          console.log('Recebido via WS:', response);
          if (response.message) {
            const sender: 'user' | 'bot' = response.user_id === userId ? 'user' : 'bot';
            const cleanText = response.message.replace(/\d{2}:\d{2}(:\d{2})?$/, '').trim();
            const newMsg: Message = { sender, text: cleanText, timestamp: new Date().toISOString() };
            setMessages((prev) => [...prev, newMsg]);
            addMessage(String(bot.agentId), newMsg);
          }
        } catch (error) {
          console.error('Erro parseando mensagem WebSocket:', error);
        }
      };

      ws.onerror = (error) => {
        Alert.alert('Erro', 'Conexão WebSocket falhou');
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;

    } catch (error: any) {
      console.error('Erro na inicialização:', error);
      Alert.alert('Erro', 'Falha ao iniciar chat');
      if (navigation.canGoBack()) navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeChat();
    return () => wsRef.current?.close();
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || !chatId || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      Alert.alert('Erro', 'Conexão WebSocket não está ativa');
      return;
    }

    const messagePayload = {
      ChatId: chatId,
      UserId: String(userId),
      AgentId: String(bot.agentId),
      Text: inputText,
      Dev: false,
    };

    console.log('Enviando:', JSON.stringify(messagePayload));
    wsRef.current.send(JSON.stringify(messagePayload));

    const newMsg = { sender: 'user', text: inputText, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, newMsg]);
    addMessage(bot.agentId, newMsg);
    setInputText('');
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
        {/* Removido o botão de deletar chat */}
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
            {message.timestamp && (
              <Text style={styles.timestampText}>{formatTime(message.timestamp)}</Text>
            )}
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
          editable={isConnected}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={!isConnected}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
