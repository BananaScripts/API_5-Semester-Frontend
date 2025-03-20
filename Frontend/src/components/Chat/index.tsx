import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./style"; 

const bots = [
  { id: 'Bot01', image: require('../../../assets/bot01.png'), descricao: "Tente entrar em contato com a assistência técnica pelo número...", category: 'faq' },
  { id: 'Bot02', image: require('../../../assets/bot02.png'), descricao: "Um database pode ser criado usando o aplicativo...", category: 'tutorial' },
  { id: 'Bot03', image: require('../../../assets/bot03.png'), descricao: "No princípio criou Deus os céus e a terra. E a terra era sem forma e vazia; e havia trevas sobre a face do abismo;", category: 'faq' },
  { id: 'Bot04', image: require('../../../assets/bot04.png'), descricao: "Alguma descrição para o Bot04", category: 'chatbot' },
  { id: 'Bot05', image: require('../../../assets/bot01.png'), descricao: "Exemplo de outro bot com uma descrição muito mais longa...", category: 'tutorial' },
  { id: 'Bot06', image: require('../../../assets/bot03.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem.", category: 'faq' },
  { id: 'Bot07', image: require('../../../assets/bot02.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem.", category: 'tutorial' },
  { id: 'Bot08', image: require('../../../assets/bot04.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem.", category: 'chatbot' },
  { id: 'Bot09', image: require('../../../assets/bot01.png'), descricao: "Prepare-se para o duelo! Este bot pode te ajudar com dicas de Yu-Gi-Oh!", category: 'faq' },
  { id: 'Bot10', image: require('../../../assets/bot02.png'), descricao: "Você morreu. Este bot tem todas as dicas para sobreviver em Dark Souls.", category: 'tutorial' },
  { id: 'Bot11', image: require('../../../assets/bot03.png'), descricao: "A jornada de um herói começa aqui. Este bot tem informações sobre os melhores RPGs.", category: 'faq' },
  { id: 'Bot12', image: require('../../../assets/bot04.png'), descricao: "Este bot é um mestre em estratégias de jogos de tabuleiro.", category: 'chatbot' },
  { id: 'Bot13', image: require('../../../assets/bot01.png'), descricao: "Quer saber mais sobre os animes da temporada? Este bot tem todas as novidades.", category: 'faq' },
  { id: 'Bot14', image: require('../../../assets/bot02.png'), descricao: "Este bot pode te ajudar a montar o melhor deck em Yu-Gi-Oh!", category: 'tutorial' },
  { id: 'Bot15', image: require('../../../assets/bot03.png'), descricao: "Descubra os segredos de Lordran com este bot especialista em Dark Souls.", category: 'faq' },
];

const categories = ['faq', 'chatbot', 'tutorial'];

const Chat = () => {
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
              <View key={bot.id} style={styles.botCard}>
                <Image style={styles.botImage} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.botTitle}>{bot.id} - {bot.category}</Text>
                  <Text style={styles.botDescription}>{bot.descricao}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Chat;