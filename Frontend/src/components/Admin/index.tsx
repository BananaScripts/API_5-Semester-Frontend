import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import UserService from "../../services/userService";
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers(1, 10);
      setUsers(response.items);
      setFilteredUsers(response.items);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.user_role === 2) {
      fetchUsers(); 
    }
  }, [currentUser]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRegister = async () => {
    const userData = {
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
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Erro ao criar o usuário.");
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    const updatedData: Partial<any> = {};
    if (editingUser.name) updatedData.Name = editingUser.name;
    if (editingUser.email) updatedData.Email = editingUser.email;
    if (editingUser.password && editingUser.password.length >= 6) {
      updatedData.Password = editingUser.password;
    }
    if (editingUser.role !== undefined) updatedData.Role = editingUser.role;

    try {
      await UserService.updateUser(editingUser.id, updatedData);
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      setModalVisible(false);
      
      fetchUsers(); 
    } catch (error) {
      console.error("Erro ao editar usuário", error);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
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
      alert("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Não foi possível excluir o usuário.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
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

          <ScrollView style={{ maxHeight: 300 }} contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
            {filteredUsers.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={styles.tableText}>{user.id}</Text>
                <Text style={styles.tableText}>{user.name}</Text>
                <Text style={styles.tableText}>{user.email}</Text>
                <Text style={styles.tableText}>
                  {user.role === 0 ? "Usuário" : user.role === 1 ? "Curador" : "Administrador"}
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

          <ScrollView style={{ maxHeight: 300 }} contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
            {filteredUsers.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={styles.tableText}>{user.id}</Text>
                <Text style={styles.tableText}>{user.name}</Text>
                <TouchableOpacity style={styles.buttonEdit} onPress={() => openEditModal(user)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => handleDelete(user.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Usuário</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={editingUser?.name}
                onChangeText={(text) => setEditingUser({ ...editingUser, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editingUser?.email}
                onChangeText={(text) => setEditingUser({ ...editingUser, email: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={editingUser?.password || ""}
                onChangeText={(text) => setEditingUser({ ...editingUser, password: text })}
              />
              <View style={styles.inputTipo}>
                <Picker
                  selectedValue={editingUser?.role}
                  onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                  dropdownIconColor="#92FFFF"
                  style={{ color: "#FFF" }}
                >
                  <Picker.Item label="Usuário" value={0} />
                  <Picker.Item label="Curador" value={1} />
                  <Picker.Item label="Administrador" value={2} />
                </Picker>
              </View>

              <View style={styles.containerbotoes}>
                <TouchableOpacity style={styles.button} onPress={handleEditUser}>
                  <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
                  <Text style={styles.botaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Admin;
