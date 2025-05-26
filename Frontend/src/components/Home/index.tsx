import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from "./style"; 
import { RootStackParamList } from '../../data/types/types'; 
import { useChatHistory } from '../../data/context/ChatHistoryContext';
import useAuth from "../../Hooks/useAuth";
import AgentService from "../../services/agentService";

type Bot = {
  id: string;
  name: string;
  descricao: string;
  image: any;
};

const Home = () => {
  const { user: currentUser } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filteredBots, setFilteredBots] = useState<Bot[]>([]);
  const [allBots, setAllBots] = useState<Bot[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { chatHistory } = useChatHistory(); 

  const fetchBots = async () => {
    try {
      const response = await AgentService.getAllAgents(1, 10);
      const mappedAgents = response.items
        .filter((agent: any) => agent.agentId && agent.name)
        .map((agent: any) => ({
          id: agent.agentId,
          agentId: String(agent.agentId), // <-- adicione esta linha!
          name: agent.name,
          descricao: agent.description || "Sem descrição",
          image: require("../../../assets/bot01.png"),
        }));
      setAllBots(mappedAgents);
      setFilteredBots(mappedAgents);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os bots recomendados.");
    }
  };

  useEffect(() => {
    if (currentUser) fetchBots();
  }, [currentUser]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = allBots.filter(bot => 
      bot.name.toLowerCase().includes(text.toLowerCase()) || 
      bot.descricao.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBots(filtered);
  };

  const handleBotPress = (bot: Bot) => {
    navigation.navigate('ChatScreen', { bot });
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nenhum usuário encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Bem-vindo/a de volta, <Text style={styles.userText}>{currentUser.user_name}!</Text>
      </Text>
      
      <View style={styles.pesquisar}>
        <TextInput 
          style={styles.input} 
          placeholder="Pesquisar..." 
          placeholderTextColor="#888" 
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.chats}>
        <Text style={styles.subtitulo}>Chatbots recomendados</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.containerChats}>
            {filteredBots.map((bot) => (
              <TouchableOpacity key={bot.id} style={styles.agentesChats} onPress={() => handleBotPress(bot)}>
                <Image style={styles.imagemBots} source={bot.image} />
                <Text style={styles.subtitulo2}>{bot.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.historico}>
        <Text style={styles.subtitulo}>Histórico de conversas</Text>
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.containerHistorico}>
            {chatHistory.map((bot: any) => {
              // Ensure bot has a 'name' property for compatibility with Bot type
              const botWithName: Bot = { 
                id: bot.id, 
                name: bot.name ?? bot.id, 
                descricao: bot.descricao ?? "Sem descrição", 
                image: bot.image ?? require("../../../assets/bot01.png")
              };
              return (
                <TouchableOpacity key={botWithName.id} style={styles.agentesHistorico} onPress={() => handleBotPress(botWithName)}>
                  <Image style={styles.imagemBotsHistorico} source={botWithName.image} />
                  <View style={styles.botInfo}>
                    <Text style={styles.subtitulo3}>{botWithName.id}</Text>
                    <Text style={styles.subtitulo3}>{botWithName.descricao}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
