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

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Carrega histórico pelo chatId
  const loadChatHistory = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/Chat/${id}`);
      setMessages(
        response.data.messages.map((msg: any) => ({
          sender: msg.sender === 'user' ? 'user' : 'bot',
          text: msg.text,
          timestamp: msg.timestamp,
        }))
      );
    } catch (error) {
      console.warn('Histórico não carregado.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Inicializa chat, cria novo chat, carrega histórico e abre WebSocket
  const initializeChat = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      // Cria novo chat na API
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

      const newChatId = createRes.data.id;
      setChatId(newChatId);

      // Carrega histórico
      await loadChatHistory(newChatId);

      // Conecta WebSocket COM chatId na URL
      const wsUrl = getWebSocketUrl(newChatId);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('🔥 Conexão WebSocket ON 🔥');
        console.log('Conectando em:', wsUrl);
        console.log('UserId:', userId);
        console.log('AgentId:', bot.agentId);
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          console.log('Recebido:', response);

          if (response.sender && response.text) {
            setMessages((prev) => [
              ...prev,
              { sender: response.sender, text: response.text, timestamp: response.timestamp },
            ]);
          } else {
            console.warn('Mensagem mal formatada recebida:', response);
          }
        } catch (error) {
          console.error('Erro na mensagem:', error);
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
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }, [userId, bot.agentId, loadChatHistory, navigation]);

  useEffect(() => {
    initializeChat();
    return () => wsRef.current?.close();
  }, [initializeChat]);

  // Envia mensagem via WebSocket incluindo AgentId e ChatId no corpo JSON
  const handleSend = () => {
    if (
      !inputText.trim() ||
      !chatId ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      Alert.alert('Erro', 'Conexão WebSocket não está ativa');
      return;
    }

    const messagePayload = {
      ChatId: chatId,
      UserId: String(userId),
      AgentId: bot.agentId,
      Text: inputText,
      Dev: true,
    };

    console.log('Enviando:', JSON.stringify(messagePayload));
    wsRef.current.send(JSON.stringify(messagePayload));
    setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
    setInputText('');
  };

  // Deleta chat
  const handleDeleteChat = async () => {
    if (!chatId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      await api.delete(`/Chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Chat deletado');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível deletar o chat');
    }
  };

  // Reabre chat
  const handleOpenChat = async () => {
    if (!chatId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      await api.patch(`/Chat/${chatId}/open`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Chat reaberto');
    } catch {
      Alert.alert('Erro', 'Não foi possível reabrir o chat');
    }
  };

  // Fecha chat
  const handleCloseChat = async () => {
    if (!chatId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      await api.patch(`/Chat/${chatId}/close`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Chat fechado');
    } catch {
      Alert.alert('Erro', 'Não foi possível fechar o chat');
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={bot.image} style={styles.botImage} />
        <Text style={styles.botName}>{bot.name}</Text>
        <TouchableOpacity onPress={handleDeleteChat} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
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

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleSend()}
          editable={isConnected}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={!isConnected}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
