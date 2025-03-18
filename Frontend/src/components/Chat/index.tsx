

import React from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { styles } from "./style"; 

const bots = [
  { id: 'Bot01', image: require('../../../assets/bot01.png'), descricao: "Tente entrar em contato com a assistência técnica pelo número..."},
  { id: 'Bot02', image: require('../../../assets/bot02.png'), descricao: "Um database pode ser criado usando o aplicativo..."},
  { id: 'Bot03', image: require('../../../assets/bot03.png'), descricao: "No princípio criou Deus os céus e a terra. E a terra era sem forma e vazia; e havia trevas sobre a face do abismo;"},
  { id: 'Bot04', image: require('../../../assets/bot04.png'), descricao: "Alguma descrição para o Bot04"},
  { id: 'Bot05', image: require('../../../assets/bot01.png'), descricao: "Exemplo de outro bot com uma descrição muito mais longa..."},
  { id: 'Bot06', image: require('../../../assets/bot03.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem."},
  { id: 'Bot07', image: require('../../../assets/bot02.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem."},
  { id: 'Bot08', image: require('../../../assets/bot04.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem."},
];

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chatbots disponíveis</Text>

      <View style={styles.historico}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.containerHistorico}>
            {bots.map((bot) => (
              <View key={bot.id} style={styles.agentesHistorico}>
                <Image style={styles.imagemBotsHistorico} source={bot.image} />
                <View style={styles.botInfo}>
                  <Text style={styles.subtitulo2}>{bot.id}</Text>
                  <Text style={styles.subtitulo3}>{bot.descricao}</Text>
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
