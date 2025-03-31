import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import React, { useState, useEffect } from "react";
import { UserCreate } from "../../interfaces/userCreate";
import UserService from "../../services/userService";
import getUserRole from "../../services/decodedService";
import useAuth from "../../Hooks/useAuth";


const Admin = () => {
  const { user: currentUser } = useAuth();
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
        setUsers(response.items);
        setFilteredUsers(response.items);
      } catch (error) {
        console.error("Connection error:", error);
      }
    };
    if (currentUser?.user_role === 2) {
      testConnection();
    }

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);


  }, [searchTerm, users, currentUser]);



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

  const handleDelete = async (userId: number) => {
    try {
      if (currentUser?.user_role !== 2) {
        Alert.alert("Acesso Negado", "Somente administradores podem excluir usuários");
        return;
      }
      if (currentUser?.user_id === userId) {
        Alert.alert("Erro", "Você não pode excluir a si mesmo");
        return;
      }

      await UserService.deleteUser(userId);

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting user:", error.message);
        alert("Não foi possível excluir o usuário. Verifique se você tem permissões suficientes.");
      } else {
        console.error("Unknown error:", error);
        alert("Ocorreu um erro desconhecido.");
      }
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

  const renderEdit = ({ item }: { item: any }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableText}>{item.id}</Text>
      <Text style={styles.tableText}>{item.name}</Text>
      <TouchableOpacity style={styles.buttonEdit}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
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

  <ScrollView
    style={{ maxHeight: 300 }}
    contentContainerStyle={{ flexGrow: 1 }}
    nestedScrollEnabled={true}
  >
    {filteredUsers.map((item) => (
      <View key={item.id} style={styles.tableRow}>
        <Text style={styles.tableText}>{item.id}</Text>
        <Text style={styles.tableText}>{item.name}</Text>
        <Text style={styles.tableText}>{item.email}</Text>
        <Text style={styles.tableText}>
          {item.role === 0 ? "Usuário" : item.role === 1 ? "Curador" : "Administrador"}
        </Text>
      </View>
    ))}
  </ScrollView>
</View>

<View style={styles.containerEditar}>
  <Text style={styles.dadosText}>Editar Usuários</Text>

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
    <Text style={styles.tableHeaderText}>Editar</Text>
    <Text style={styles.tableHeaderText}>Excluir</Text>
  </View>

  <ScrollView
    style={{ maxHeight: 300 }} 
    contentContainerStyle={{ flexGrow: 1 }}
    nestedScrollEnabled={true}
  >
    {filteredUsers.map((item) => (
      <View key={item.id} style={styles.tableRow}>
        <Text style={styles.tableText}>{item.id}</Text>
        <Text style={styles.tableText}>{item.name}</Text>
        <TouchableOpacity style={styles.buttonEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
</View>
      </View>
    </ScrollView>
  );
};

export default Admin;
