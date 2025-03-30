import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Admin/style'; // 

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken'); // Remove o token salvo
      navigation.replace('Login'); // Volta para a tela de login
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair.');
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.botaoTexto}>Sair</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
