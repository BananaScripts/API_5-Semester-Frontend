import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from "./style";
import { getSessionBotHistory } from '../../data/bots/BotSessionHistory';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Bot } from '../../data/types/types';

type AgentesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

type BotWithLastMessage = Bot & {
  lastMessageSnippet?: string;
};

// Variável global para manter histórico da sessão (não perde ao navegar)
const sessionBotHistory: BotWithLastMessage[] = [];

const Agentes = () => {
  const navigation = useNavigation<AgentesScreenNavigationProp>();
  const [sessionBots, setSessionBots] = useState<BotWithLastMessage[]>([]);

  // Atualiza a lista local pegando da variável global toda vez que a tela foca
  useFocusEffect(
  useCallback(() => {
    const bots = getSessionBotHistory().map((bot: any) => ({
      id: bot.id,
      image: bot.image,
      lastMessageSnippet: bot.lastMessageSnippet ?? "",
    }));
    setSessionBots(bots);
  }, [])
);


  // Função para adicionar/atualizar bot no histórico global
  const addOrUpdateBot = (bot: Bot, lastMessage: string) => {
    const index = sessionBotHistory.findIndex(b => b.id === bot.id);
    if (index >= 0) {
      // Atualiza o snippet e move para o topo
      sessionBotHistory.splice(index, 1);
    }
    sessionBotHistory.unshift({ ...bot, lastMessageSnippet: lastMessage });
  };

  // Ao clicar, adiciona no histórico e navega para o chat
  const handleBotPress = (bot: Bot) => {
    // Aqui pega a última mensagem real; vou simular
    const fakeLastMsg = "Última mensagem que o usuário enviou ou recebeu...";
    addOrUpdateBot(bot, fakeLastMsg);
    navigation.navigate('ChatScreen', { bot });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de chats</Text>
      <ScrollView style={styles.chatContainer}>
        {sessionBots.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
            Nenhuma interação ainda...
          </Text>
        )}
        {sessionBots.map((bot) => (
          <TouchableOpacity key={bot.id} style={styles.botCard} onPress={() => handleBotPress(bot)}>
            <Image style={styles.botImage} source={bot.image} />
            <View style={styles.botInfo}>
              <Text style={styles.botName}>{bot.id}</Text>
              {bot.lastMessageSnippet && (
                <Text style={{ fontStyle: "italic", color: "#555", marginTop: 4 }} numberOfLines={1}>
                  {bot.lastMessageSnippet}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Agentes;
