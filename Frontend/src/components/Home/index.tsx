import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from "./style"; 
import { bots, Bot } from "../../data/bots/bots"; 
import { RootStackParamList } from '../../data/types/types'; 
import { useChatHistory } from '../../data/context/ChatHistoryContext';

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredBots, setFilteredBots] = useState<Bot[]>(bots);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { chatHistory } = useChatHistory(); 
  const handleSearch = (text: string) => {
    setSearchText(text);
    filterBots(text);
  };

  const filterBots = (text: string) => {
    const filtered = bots.filter(bot => 
      bot.id.toLowerCase().includes(text.toLowerCase()) || 
      bot.descricao.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBots(filtered);
  };

  const handleBotPress = (bot: Bot) => {
    navigation.navigate('ChatScreen', { bot });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Bem-vindo/a de volta, <Text style={styles.userText}>usuário!</Text>
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
                <Text style={styles.subtitulo2}>{bot.id}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.historico}>
        <Text style={styles.subtitulo}>Histórico de conversas</Text>
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.containerHistorico}>
            {chatHistory.map((bot) => (
              <TouchableOpacity key={bot.id} style={styles.agentesHistorico} onPress={() => handleBotPress(bot)}>
                <Image style={styles.imagemBotsHistorico} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.subtitulo3}>{bot.id}</Text>
                  <Text style={styles.subtitulo3}>{bot.descricao}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;