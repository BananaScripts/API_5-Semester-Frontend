import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import React, { useState, useEffect } from "react";
import { UserCreate } from "../../interfaces/userCreate"; 
import UserService from "../../services/userService";

const Admin = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<number>(0); 

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await UserService.getAllUsers(1, 10); 
        console.log("Connection successful:", response);
      } catch (error) {
        console.error("Connection error:", error);
      }
    };
    testConnection();
  }
  , []);

  const handleRegister = async () => {
    const userData: UserCreate = {
      Name: userName,
      Password: password,
      Email: email,
      Role: role,
    };

    try {
      const response = await UserService.createUser(userData);
      console.log("User created:", response);
      setUserName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Administrador</Text>
      </View>

      <View style={styles.containerUsuario}>
        <Text style={styles.dadosText}>Cadastrar Usuário</Text>

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
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue as 0 | 1 | 2)} 
            dropdownIconColor="#92FFFF"
            style={{ color: "#FFF" }}
          >
            <Picker.Item label="Usuário" value={0} />
            <Picker.Item label="Curador" value={1} />
            <Picker.Item label="Administrador" value={2} />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin;
