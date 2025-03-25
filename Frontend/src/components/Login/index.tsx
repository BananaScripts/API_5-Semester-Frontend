import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { styles } from './style';
import { users } from '../../data/users/users';

const Login = ({ navigation }: any) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const user = users.find((user) => user.cpf === cpf && user.senha === senha);

    if (user) {
      navigation.replace('HomeTabs', { user });
    } else {
      Alert.alert('Erro', 'CPF ou Senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf} 
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha} 
        secureTextEntry={true}
      />
      
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
