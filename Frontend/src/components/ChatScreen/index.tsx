// imports bonitões no topo
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
import { Bot, getWebSocketUrl } from '../../services/chatService';
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
  const [isConnected, setIsConnected] = useState(false);
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

      const wsUrl = getWebSocketUrl(newChatId);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('🔥 Conexão WebSocket ON 🔥');
        setIsConnected(true);
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
        Alert.alert('Erro', 'Conexão WebSocket falhou');
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;

      await loadChatHistory(newChatId);

    } catch (error: any) {
      console.error('Erro na inicialização:', error);
      Alert.alert('Erro', 'Falha ao iniciar chat');
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }, [userId, bot.id, navigation, loadChatHistory]);

  useEffect(() => {
    initializeChat();
    return () => wsRef.current?.close();
  }, [initializeChat]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatId || !wsRef.current) return;

    try {
      setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
      const messagePayload = JSON.stringify({
        ChatId: chatId,
        UserId: userId,
        AgentId: bot.id,
        Text: inputText,
        Dev: true
      });

      wsRef.current.send(messagePayload);
      setInputText('');

      await api.post(`/Chat/${chatId}/messages?agentId=${bot.id}`, {
        Sender: 'user',
        Text: inputText,
      });
    } catch (error) {
      Alert.alert('Erro', 'Mensagem não enviada');
    }
  };

  const handleDeleteChat = async () => {
    if (!chatId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      await api.delete(`/Chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Chat deletado');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o chat');
    }
  };

  const handleOpenChat = async () => {
    if (!chatId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      await api.patch(`/Chat/${chatId}/open`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Chat reaberto');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível reabrir o chat');
    }
  };

  const handleCloseChat = async () => {
    if (!chatId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      await api.patch(`/Chat/${chatId}/close`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Chat fechado');
    } catch (error) {
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
