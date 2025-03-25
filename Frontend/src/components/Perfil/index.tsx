import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./style";

const Perfil = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Perfil do Usuário</Text>
      </View>
      <View style={styles.fotoUsuario}>
        <Image source={require('../../../assets/user.png')} style={styles.foto} />
      </View>

      <View style={styles.containerDados}>
        <Text style={styles.userText}>Usuário!</Text>
        <Text style={styles.dadosText}>Cargo</Text>
        <Text style={styles.dadosText}>Data de entrada</Text>
        <Text style={styles.dadosText}>Permissões</Text>
      </View>

      <View style={styles.containerConfiguracoes}>
      <Text style={styles.dadosText}>Configurações</Text>
      </View>
    </View>
  );
};

export default Perfil;
