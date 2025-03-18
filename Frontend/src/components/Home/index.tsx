import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./style"; 

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Bem vindo/a de volta, <Text style={styles.userText}>usuário</Text>
      </Text>
      
      <View style={styles.pesquisar}>
        <TextInput style={styles.input} placeholder="Pesquisar..." placeholderTextColor="#888" />
      </View>

      <View style={styles.chats}>
        <Text style={styles.subtitulo}>
          Chatsbots recomendados
          <View style={styles.agentesChats}></View>
        </Text>
      </View>

    </View>
  );
};

export default Home;
