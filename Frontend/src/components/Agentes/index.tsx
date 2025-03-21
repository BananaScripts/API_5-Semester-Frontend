import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";
import { useChatHistory } from '../../data/context/ChatHistoryContext';
import { Bot } from '../../data/bots/bots';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../data/types/types';

const Agentes = () => {
  
  type AgentesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;
  
  const navigation = useNavigation<AgentesScreenNavigationProp>();
  const { chatHistory } = useChatHistory();

  const handleBotPress = (bot: Bot) => {
    navigation.navigate('ChatScreen', { bot });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de chats</Text>
      <View style={styles.chatContainer}>
      <ScrollView>
        {chatHistory.map((bot) => (
          <TouchableOpacity key={bot.id} style={styles.botCard} onPress={() => handleBotPress(bot)}>
            <Image style={styles.botImage} source={bot.image} />
            <View style={styles.botInfo}>
              <Text style={styles.botName}>{bot.id}</Text>
              <Text style={styles.botDescription}>{bot.descricao}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
  );
};

export default Agentes;