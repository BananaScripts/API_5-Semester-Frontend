import { View, Text, Image, } from "react-native";
import { styles } from "./style";
import React, { useState } from "react";
import { Usuario } from '../../data/types/usuario';
import { RootStackParamList } from '../../data/types/types'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Perfil = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const user = filteredUsers[0]; 

    if (!user) {
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
      </View>
      
      <View style={styles.fotoUsuario}>
        <Image source={user.imagemPerfil} style={styles.foto} />
      </View>

      <View style={styles.containerDados}>
        <Text style={styles.userText}>{user.nome}</Text>
        <Text style={styles.dadosText}>{user.cargo}</Text>
        <Text style={styles.dadosText}>{user.dataEntrada}</Text> 
      </View>

      <View style={styles.containerConfiguracoes}>
      <Text style={styles.dadosText}>Configurações</Text>
      </View>
    
    </View>
  );
};

export default Perfil;
