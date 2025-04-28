import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style"; 
import { getBots, Bot } from "../../services/chatService";

type ChatScreenNavigationProp = {
  navigate: (screen: string, params: { bot: Bot }) => void;
};

const Chat = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [filteredBots, setFilteredBots] = useState<Bot[]>([]);

  useEffect(() => {
    const fetchBots = async () => {
      const bots = await getBots();
      setFilteredBots(bots);
    };

    fetchBots();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterBots(text);
  };

  const filterBots = (text: string) => {
    const filtered = filteredBots.filter(bot => 
      bot.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBots(filtered);
  };

  const handleBotPress = (bot: Bot) => {
    navigation.navigate('ChatScreen', { bot });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chatbots disponíveis</Text>
      
      <View style={styles.searchAndTagsWrapper}>
        <View style={styles.searchAndTagsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.botsWrapper}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {filteredBots.map((bot) => (
              <TouchableOpacity key={bot.id} style={styles.botCard} onPress={() => handleBotPress(bot)}>
                <Image style={styles.botImage} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.botTitle}>{bot.name}</Text>
                  <Text style={styles.botDescription}>{bot.descricao}</Text>
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