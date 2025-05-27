import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from "./style";
import AgentService from "../../services/agentService";
import useAuth from "../../Hooks/useAuth";
import { useChatHistory } from "../../data/context/ChatHistoryContext";

type ChatScreenNavigationProp = {
  navigate: (screen: string, params: { bot: any }) => void;
};

const Chat = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { user: currentUser } = useAuth();
  const [agents, setAgents] = useState<any[]>([]);
  const { addChatToHistory } = useChatHistory();

  const fetchAgents = async () => {
    try {
      const response = await AgentService.getAllAgents(1, 20);
      const mappedAgents = response.items
        .filter((agent: any) => agent.agentId && agent.name && agent.description)
        .map((agent: any) => ({
          agentId: agent.agentId,
          name: agent.name,
          description: agent.description,
          category: agent.config?.Category || 'chatbot',
          image: require("../../../assets/bot01.png"),
        }));
      setAgents(mappedAgents);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os chatbots.");
    }
  };

  useEffect(() => {
    if (currentUser) fetchAgents();
  }, [currentUser]);

  useFocusEffect(
    useCallback(() => {
      if (currentUser) {
        fetchAgents();
      }
    }, [currentUser])
  );

  const handleBotPress = (bot: any) => {
    const botWithSnippet = { ...bot, lastMessageSnippet: "Última mensagem..." };
    addChatToHistory(botWithSnippet);
    navigation.navigate('ChatScreen', { bot });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chatbots disponíveis</Text>

      <View style={styles.botsWrapper}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {agents.map((bot) => (
              <TouchableOpacity key={bot.agentId} style={styles.botCard} onPress={() => handleBotPress(bot)}>
                <Image style={styles.botImage} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.botTitle}>{bot.name} - {bot.category}</Text>
                  <Text style={styles.botDescription}>{bot.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Chat;
