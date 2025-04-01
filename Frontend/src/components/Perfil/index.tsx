import { View, Text, Image } from "react-native";
import { styles } from "./style";
import React, { useState, useEffect } from "react";
import { RootStackParamList } from '../../data/types/types'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LogoutButton from '../Login/logout';
import useAuth from "../../Hooks/useAuth";

const Perfil = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user: currentUser } = useAuth();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nenhum usuário encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Perfil do Usuário</Text>
        <LogoutButton />
      </View>
      
      <View style={styles.fotoUsuario}>
  <Image 
    source={require('../../../assets/joao.png')} 
    style={styles.foto} 
  />
</View>


      <View style={styles.containerDados}>
        <Text style={styles.userText}>Nome: {currentUser.user_name}</Text> 
        <Text style={styles.dadosText}>Tipo do usuário: {currentUser.user_role === 1 ? 'Admin' : 'User'}</Text> 
        <Text style={styles.dadosText}>Email: {currentUser.user_email}</Text> 
      </View>

      <View style={styles.containerConfiguracoes}>
        <Text style={styles.dadosText}>Configurações</Text>
      </View>
    </View>
  );
};

export default Perfil;
