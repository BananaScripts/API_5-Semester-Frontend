import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";
import { useChatHistory } from '../../data/context/ChatHistoryContext';
import { bots } from '../../data/bots/bots';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../data/types/types';
import { Ionicons } from "@expo/vector-icons";

const Agentes = () => {
  type AgentesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

  const navigation = useNavigation<AgentesScreenNavigationProp>();
  const { chatHistory } = useChatHistory();

  const handleBotPress = (bot: any) => {
    navigation.navigate('ChatScreen', { bot });
  };

  const uniqueAgentIds = Array.from(new Set(chatHistory.map(c => c.agentId)));

  const botsConversados = bots.filter(bot => uniqueAgentIds.includes(bot.agentId));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Chats</Text>
      <View style={styles.chatContainer}>
        {botsConversados.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Ionicons name="chatbubble-ellipses-outline" size={64} color="#888" />
            <Text style={{ color: '#888', marginTop: 10 }}>Nenhuma conversa ainda</Text>
          </View>
        ) : (
          <ScrollView>
            {botsConversados.map((bot) => (
              <TouchableOpacity
                key={bot.agentId}
                style={styles.botCard}
                onPress={() => handleBotPress(bot)}
              >
                <Image style={styles.botImage} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.botName}>{bot.name}</Text>
                  <Text style={styles.botDescription}>{bot.descricao}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Agentes;
