import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type ChatScreenRouteProp = RouteProp<{ params: { bot: { id: string; descricao: string } } }, 'params'>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const { bot } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {bot.id}</Text>
      <Text style={styles.description}>{bot.descricao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default ChatScreen;