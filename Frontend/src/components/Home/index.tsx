import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./style"; 

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Bem vindo/a de volta, <Text style={styles.userText}>usuário</Text>
      </Text>
      
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Pesquisar..." placeholderTextColor="#888" />
      </View>
    </View>
  );
};

export default Home;
