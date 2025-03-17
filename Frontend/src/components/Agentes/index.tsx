import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Agentes = () => {
  return (
    <View style={styles.container}>
      <Text>Chatbots disponíveis</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',      
  },
});

export default Agentes;
