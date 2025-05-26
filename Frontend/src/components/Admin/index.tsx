import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import UserService from "../../services/userService";
import useAuth from "../../Hooks/useAuth";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 8 },
  propsForDots: { r: "4", strokeWidth: "2" }
};

type DashboardStats = {
  total_chats: number;
  total_messages: number;
  avg_messages_per_chat: number;
  total_users: number;
  top_users: Array<{ userId: string; chatCount: number; messageCount: number }>;
  top_words: Array<{ word: string; count: number }>;
};

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

  // Dashboard state
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Carregar usuários
  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers(1, 10);
      setUsers(response.items);
      setFilteredUsers(response.items);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  // Carregar estatísticas do dashboard
  const fetchStats = async () => {
    try {
      const res = await fetch("http://10.0.2.2:7254/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.user_role === 2) {
      fetchUsers();
      fetchStats();
    }
  }, [currentUser]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Cadastro de usuário
  const handleRegister = async () => {
    const userData = {
      Name: userName,
      Password: password,
      Email: email,
      Role: role,
    };

    try {
      const response = await UserService.createUser(userData);
      setUserName('');
      setEmail('');
      setPassword('');
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert("Erro", "Erro ao criar o usuário.");
    }
  };

  // Abrir modal de edição
  const openEditModal = (user: any) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  // Editar usuário
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

  // Excluir usuário
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
      Alert.alert("Sucesso", "Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  };

  // Dados do gráfico
  const labels = stats?.top_users.map(u => u.userId) ?? [];
  const chatData = stats?.top_users.map(u => u.chatCount) ?? [];
  const messageData = stats?.top_users.map(u => u.messageCount) ?? [];

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer]}>
      <View style={styles.container}>

        {/* DASHBOARD */}
        {stats && (
          <View style={styles.containerUsuario}>
            <Text style={styles.dadosText}>Dashboards</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <View>
                <Text style={styles.dadosText}>{stats.total_chats}</Text>
                <Text style={styles.dadosText}>Total Chats</Text>
              </View>

              <View>
                <Text style={styles.dadosText}>{stats.total_messages}</Text>
                <Text style={styles.dadosText}>Total Mensagens</Text>
              </View>
              

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
              <View>
                <Text style={styles.dadosText}>{stats.total_users}</Text>
                <Text style={styles.dadosText}>Total Usuários</Text>
              </View>
              <View>
                <Text style={styles.dadosText}>{stats.avg_messages_per_chat.toFixed(2)}</Text>
                <Text style={styles.dadosText}>Média Msgs/Chat</Text>
              </View>
            </View>
            <Text style={[styles.dadosText, { marginTop: 10}]}> Usuários Recorrentes</Text>
            <BarChart
              data={{
                labels,
                datasets: [
                  { data: chatData, color: () => "#2280B0" },
                  { data: messageData, color: () => "#FFB300" }
                ]
              }}
              width={screenWidth - 125}
              height={220}
              chartConfig={chartConfig}
              yAxisLabel=""
              yAxisSuffix=""
              style={{ marginVertical: 8, borderRadius: 8 }}
              fromZero
              showBarTops
              withHorizontalLabels
            />
            <Text style={[styles.dadosText, { marginTop: 20 }]}>Palavras Mais Recorrentes</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
              {stats.top_words.map((w, idx) => (
                <View key={idx} style={{ backgroundColor: "#e0f7fa", borderRadius: 12, padding: 6, margin: 4 }}>
                  <Text style={{ color: "#2280B0", fontWeight: "bold" }}>{w.word}</Text>
                  <Text style={{ color: "#333" }}> ({w.count})</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CADASTRAR USUÁRIO */}
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

        {/* VISUALIZAR USUÁRIOS */}
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

        {/* EDITAR/EXCLUIR USUÁRIOS */}
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

        {/* MODAL DE EDIÇÃO */}
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

