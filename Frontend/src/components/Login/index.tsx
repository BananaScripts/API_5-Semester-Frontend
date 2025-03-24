import React from 'react';
import { View, TouchableOpacity, Text,TextInput, Image } from 'react-native';
import { styles } from './style';

const Login = ({ navigation }: any) => {
  const handleLogin = () => {
    navigation.replace('HomeTabs');
  };

  return (
    <View style={styles.container}>
       <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      <TextInput 
        style={styles.input} 
        placeholder="CPF" 
        // placeholderTextColor="#888" 
              />
      <TextInput
        style={styles.input}
        placeholder="Senha"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
