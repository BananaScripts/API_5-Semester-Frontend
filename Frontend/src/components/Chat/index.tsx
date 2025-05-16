import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";
import AgentService from "../../services/agentService";
import useAuth from "../../Hooks/useAuth";

const categories = ['faq', 'chatbot', 'tutorial'];

type ChatScreenNavigationProp = {
  navigate: (screen: string, params: { bot: any }) => void;
};

const Chat = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { user: currentUser } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [agents, setAgents] = useState<any[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      const response = await AgentService.getAllAgents(1, 20);
      const mappedAgents = response.items.map((agent: any) => ({
        agent_id: agent.agentId,
        agent_name: agent.name,
        agent_description: agent.description,
        agent_category: agent.config?.Category || 'chatbot', 
        agent_image: require("../../../assets/botIcon.png"), 
      }));
      setAgents(mappedAgents);
      setFilteredAgents(mappedAgents);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os chatbots.");
    }
  };

  useEffect(() => {
    if (currentUser) fetchAgents();
  }, [currentUser]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterAgents(text, selectedCategory);
  };

  const handleCategoryPress = (category: string) => {
    const newSelectedCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newSelectedCategory);
    filterAgents(searchText, newSelectedCategory);
  };

  const filterAgents = (text: string, category: string | null) => {
    const filtered = agents.filter(agent =>
      (agent.agent_name.toLowerCase().includes(text.toLowerCase()) ||
        agent.agent_description.toLowerCase().includes(text.toLowerCase())) &&
      (!category || agent.agent_category === category)
    );
    setFilteredAgents(filtered);
  };

  const handleBotPress = (bot: any) => {
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
            {filteredAgents.map((bot) => (
              <TouchableOpacity key={bot.agent_id} style={styles.botCard} onPress={() => handleBotPress(bot)}>
                <Image style={styles.botImage} source={bot.agent_image} />
                <View style={styles.botInfo}>
                  <Text style={styles.botTitle}>{bot.agent_name} - {bot.agent_category}</Text>
                  <Text style={styles.botDescription}>{bot.agent_description}</Text>
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
