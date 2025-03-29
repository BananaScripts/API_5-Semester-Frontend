import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";  
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import React, { useState, useEffect } from "react";
import { UserCreate } from "../../interfaces/userCreate"; 
import { UserResponse } from "../../interfaces/userResponse";
import { UserUpdate } from "../../interfaces/userUpdate";
import GetAllusers from "../../services/userService";
import UserService from "../../services/userService";
import updateUser from "../../services/userService";
import deleteUser from "../../services/userService";
import getUserById from "../../services/userService";

const Admin = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<number>(0); 
  const [userId, setUserId] = useState<number | null>(null); 

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
  }, []);

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

  const handleDelete = async (Id: number) => {
    try {
      await UserService.deleteUser(Id);
      console.log("User deleted:", Id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleGetUser = async (Id: number) => {
    if (!Id) {
      console.error("ID de usuário inválido.");
      return;
    }

    try {
      const response = await UserService.getUserById(Id);
      console.log("User fetched:", response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleUpdate = async (Id: number) => {
    if (!userName || !email || !password) {
      console.error("Todos os campos devem ser preenchidos!");
      return;
    }

    const userData: UserUpdate = {
      Name: userName,
      Password: password,
      Email: email,
      Role: role,
    };

    try {
      const response = await UserService.updateUser(Id, userData);
      console.log("User updated:", response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAction = (action: string) => {
    if (!userId) {
      console.error("Por favor, insira um ID de usuário válido.");
      return;
    }

    switch (action) {
      case "view":
        handleGetUser(userId);
        break;
      case "update":
        handleUpdate(userId);
        break;
      case "delete":
        handleDelete(userId);
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

          <TextInput
            style={styles.input}
            placeholder="ID do Usuário (para editar ou deletar)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={userId?.toString() || ''}
            onChangeText={(text) => setUserId(Number(text))}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAction("view")}
          >
            <Text style={styles.botaoTexto}>Visualizar Usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAction("update")}
          >
            <Text style={styles.botaoTexto}>Atualizar Usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAction("delete")} 
          >
            <Text style={styles.botaoTexto}>Deletar Usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Admin;
