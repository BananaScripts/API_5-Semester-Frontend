import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:7254/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao fazer login.';

        if (response.status === 401) {
          errorMessage = 'E-mail ou senha incorretos.';
        } else if (response.status === 500) {
          errorMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      await AsyncStorage.multiSet([
        ['token', data.token.result],
        ['user', JSON.stringify(data.user)]
      ]);
      console.log('Login bem-sucedido:', data);
      navigation.replace('HomeTabs', { user: data });

    } catch (error: any) {
      if (error.message.includes('Network request failed')) {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão de rede.');
      } else {
        Alert.alert('Erro', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
