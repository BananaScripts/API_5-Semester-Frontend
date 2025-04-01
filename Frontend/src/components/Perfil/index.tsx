import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { styles } from "./style";
import React, { useState, useEffect } from "react";
import { RootStackParamList } from '../../data/types/types'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LogoutButton from '../Login/logout';
import useAuth from "../../Hooks/useAuth";
import UserService from "../../services/userService";
import { UserUpdate } from "../../interfaces/userUpdate";
import { Picker } from '@react-native-picker/picker'; 

const Perfil = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user: currentUser } = useAuth();
  const [userName, setUserName] = useState<string>(currentUser ? currentUser.user_name : '');
  const [email, setEmail] = useState<string>(currentUser ? currentUser.user_email : '');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<number>(currentUser ? currentUser.user_role : 0);

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nenhum usuário encontrado</Text>
      </View>
    );
  }

  const handleEdit = async () => {
    if (!currentUser) return;
  
    const updatedData: Partial<UserUpdate> = {};
  
    if (userName !== "") {
      updatedData.Name = userName;
    }
  
    if (email !== "") {
      if (!email.includes("@")) {
        alert("Digite um email válido.");
        return;
      }
      updatedData.Email = email;
    }
  
    if (password !== '') { 
      if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      updatedData.Password = password;
    }
  
    if (role !== currentUser.user_role) {
      updatedData.Role = role;
    }
  
    if (Object.keys(updatedData).length === 0) {
      alert("Nenhuma alteração feita.");
      return;
    }
  
    try {
      const response = await UserService.updateUser(currentUser.user_id, updatedData);
      console.log("Usuário editado", response);
      alert("Dados atualizados com sucesso!");
      setPassword("");
    } catch (error: any) {
      console.error("Erro ao editar usuário", error.response?.data || error.message);
      alert("Erro ao atualizar os dados.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Perfil do Usuário</Text>
        <LogoutButton />
      </View>

      <View style={styles.fotoUsuario}>
        <Image source={require('../../../assets/joao.png')} style={styles.foto} />
      </View>

      <View style={styles.containerDados}>
        <Text style={styles.userText}>Nome: {currentUser.user_name}</Text> 
        <Text style={styles.dadosText}>Tipo do usuário: {currentUser.user_role === 2 ? 'Admin' : 'User'}</Text> 
        <Text style={styles.dadosText}>Email: {currentUser.user_email}</Text> 
      </View>

      <View style={styles.containerConfiguracoes}>
        <Text style={styles.dadosText}>Configurações</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.dadosText}>Tipo de Usuário</Text>
        <View style={styles.inputTipo}>
          <Picker
            selectedValue={currentUser.user_role}
            onValueChange={(itemValue) => setRole(itemValue as 0 | 1 | 2)}
            dropdownIconColor="#92FFFF"
            style={{ color: "#FFF" }}
          >
            <Picker.Item label="Usuário" value={0} />
            <Picker.Item label="Curador" value={1} />
            <Picker.Item label="Administrador" value={2} />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default Perfil;
