import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";  
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
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await UserService.getAllUsers(1, 10); 
        console.log("Connection successful:", response);
        setUsers(response.items);
        setFilteredUsers(response.items); 
      } catch (error) {
        console.error("Connection error:", error);
      }
    };
    testConnection();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

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

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableText}>{item.id}</Text>
      <Text style={styles.tableText}>{item.name}</Text>
      <Text style={styles.tableText}>{item.email}</Text>
      <Text style={styles.tableText}>{item.role === 0 ? 'Usuário' : item.role === 1 ? 'Curador' : 'Administrador'}</Text>
    </View>
  );

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
        </View>

        <View style={styles.containerVisualizar}>
          <Text style={styles.dadosText}>Visualizar Usuários</Text>

          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome ou email"
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>ID</Text>
            <Text style={styles.tableHeaderText}>Nome</Text>
            <Text style={styles.tableHeaderText}>Email</Text>
            <Text style={styles.tableHeaderText}>Tipo</Text>
          </View>

          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Admin;
