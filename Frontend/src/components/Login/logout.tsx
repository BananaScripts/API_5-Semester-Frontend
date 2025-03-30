import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Login/style';
import useAuth from '../../Hooks/useAuth';

const LogoutButton = () => {
  const navigation = useNavigation<{ replace: (screen: string) => void }>();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      
      logout();
      
      navigation.replace('Login');
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