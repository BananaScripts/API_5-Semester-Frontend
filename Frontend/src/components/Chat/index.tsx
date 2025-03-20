import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style"; 
import { bots } from "../../data/bots/bots";

const categories = ['faq', 'chatbot', 'tutorial'];

type ChatScreenNavigationProp = {
  navigate: (screen: string, params: { bot: { id: string; descricao: string; category: string; image: any; } }) => void;
};

const Chat = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [filteredBots, setFilteredBots] = useState(bots);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterBots(text, selectedCategory);
  };

  const handleCategoryPress = (category: string) => {
    const newSelectedCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newSelectedCategory);
    filterBots(searchText, newSelectedCategory);
  };

  const filterBots = (text: string, category: string | null) => {
    const filtered = bots.filter(bot => 
      (bot.id.toLowerCase().includes(text.toLowerCase()) || 
      bot.descricao.toLowerCase().includes(text.toLowerCase())) &&
      (!category || bot.category === category)
    );
    setFilteredBots(filtered);
  };

  const handleBotPress = (bot: { id: string; descricao: string; category: string; image: any }) => {
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

          <View style={styles.tagContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[styles.tag, selectedCategory === category && styles.selectedTag]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.tagText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.botsWrapper}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {filteredBots.map((bot) => (
              <TouchableOpacity key={bot.id} style={styles.botCard} onPress={() => handleBotPress(bot)}>
                <Image style={styles.botImage} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.botTitle}>{bot.id} - {bot.category}</Text>
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