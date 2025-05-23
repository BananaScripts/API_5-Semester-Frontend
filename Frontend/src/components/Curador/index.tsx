import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import useAuth from "../../Hooks/useAuth";
import AgentService from "../../services/agentService";
import { styles } from "./style";
import { AgentUpdate } from "../../interfaces/agentUpdate"; 
import UserService from "../../services/userService";

const Curador = () => {
  const { user: currentUser } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  const [editSystemPrompt, setEditSystemPrompt] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [selectedUserIdsCreate, setSelectedUserIdsCreate] = useState<number[]>([]);
  const [selectedUserIdsEdit, setSelectedUserIdsEdit] = useState<number[]>([]);

  const [agents, setAgents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const fetchAgents = async () => {
    try {
      const response = await AgentService.getAllAgents(1, 20);
      const mappedAgents = response.items.map((agent: any) => ({
        agent_id: agent.agentId,
        agent_name: agent.name,
        agent_description: agent.description,
        agent_config: {
          ...agent.config,
          SystemPrompt: agent.config?.SystemPrompt || agent.config?.systemPrompt || "",
          AllowedUserIds: agent.config?.AllowedUserIds || [],
        },
        status: agent.status,
      }));
      setAgents(mappedAgents);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar agentes.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers(1, 100);
        setAllUsers(response.items);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser?.user_role && currentUser.user_role >= 1) {
      fetchAgents();
    }
  }, [currentUser]);

  const handleRegister = async () => {
    try {
      const agentData = {
        Name: name,
        Description: description,
        Config: {
          SystemPrompt: systemPrompt,
          AllowedFileTypes: ["pdf"],
          AllowedUserIds: selectedUserIdsCreate,
        },
      };

      await AgentService.createAgent(agentData);
      setName("");
      setDescription("");
      setSystemPrompt("");
      setSelectedUserIdsCreate([]);
      Alert.alert("Sucesso", "Agente criado com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar agente.");
    }
  };

  const openEditModal = (agent: any) => {
    setEditingAgent(agent);
    setEditName(agent.agent_name || "");
    setEditDescription(agent.agent_description || "");
    setEditSystemPrompt(agent.agent_config?.SystemPrompt || "");
    setSelectedUserIdsEdit(agent.agent_config?.AllowedUserIds || []);
    setModalVisible(true);
  };

  const handleEdit = async () => {
    if (!editingAgent) return;

    const updatedAgent: AgentUpdate = {
      Name: editName,
      Description: editDescription,
      Config: {
        SystemPrompt: editSystemPrompt.trim() || "Prompt padrão",
        AllowedFileTypes: ["pdf"],
        AllowedUserIds: selectedUserIdsEdit,
      },
    };

    try {
      await AgentService.updateAgent(editingAgent.agent_id, updatedAgent);
      Alert.alert("Sucesso", "Agente atualizado com sucesso.");
      fetchAgents();
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar o agente:", error);
      Alert.alert("Erro", "Não foi possível atualizar o agente.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!currentUser?.user_role || currentUser.user_role < 2) {
      Alert.alert("Acesso Negado", "Somente administradores podem excluir agentes.");
      return;
    }
    try {
      await AgentService.deleteAgent(id);
      Alert.alert("Sucesso", "Agente deletado com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error("Erro ao deletar agente:", error);
      Alert.alert("Erro", "Não foi possível deletar agente.");
    }
  };

  const filtered = agents.filter((a) =>
    (a.agent_name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Cadastro */}
        <View style={styles.containerUsuario}>
          <Text style={styles.dadosText}>Cadastrar Agente</Text>
          <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription} placeholderTextColor="#888" />
          <TextInput style={styles.inputbd} value={systemPrompt} onChangeText={setSystemPrompt} placeholder="Prompt do Sistema" placeholderTextColor="#888" multiline />
          <Text style={styles.dadosText}>Usuários Permitidos</Text>
          <ScrollView style={{ maxHeight: 150 }}>
            {allUsers.map(user => (
              <TouchableOpacity
                key={user.id}
                style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}
                onPress={() => {
                  setSelectedUserIdsCreate(prev =>
                    prev.includes(user.id)
                      ? prev.filter(id => id !== user.id)
                      : [...prev, user.id]
                  );
                }}
              >
                <View style={{
                  width: 20, height: 20, marginRight: 8,
                  borderWidth: 1, borderColor: "#ccc",
                  backgroundColor: selectedUserIdsCreate.includes(user.id) ? "#0ff" : "#fff"
                }} />
                <Text style={{ color: "#fff" }}>{user.name} ({user.email})</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Visualização */}
        <View style={styles.containerVisualizar}>
          <Text style={styles.dadosText}>Visualizar Agentes</Text>
          <TextInput style={styles.input} placeholder="Pesquisar..." value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#888" />
          <ScrollView style={{ maxHeight: 300 }} contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
            {filtered.map((agent, index) => (
              <View key={agent.agent_id ?? index} style={styles.agentCard}>
                <Text style={styles.agentName}>{agent.agent_name}</Text>
                <Text style={styles.agentDescription}>{agent.agent_description}</Text>
                <View style={styles.agentActions}>
                  <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(agent)}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(agent.agent_id)}>
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Modal de Edição */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Agente</Text>
              <TextInput style={styles.input} value={editName} onChangeText={setEditName} placeholder="Nome" placeholderTextColor="#888" />
              <TextInput style={styles.input} value={editDescription} onChangeText={setEditDescription} placeholder="Descrição" placeholderTextColor="#888" />
              <TextInput style={styles.inputbd} value={editSystemPrompt} onChangeText={setEditSystemPrompt} placeholder="Prompt do Sistema" placeholderTextColor="#888" multiline />
              <Text style={styles.dadosText}>Usuários Permitidos</Text>
              <ScrollView style={{ maxHeight: 150 }}>
                {allUsers.map(user => (
                  <TouchableOpacity
                    key={user.id}
                    style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}
                    onPress={() => {
                      setSelectedUserIdsEdit(prev =>
                        prev.includes(user.id)
                          ? prev.filter(id => id !== user.id)
                          : [...prev, user.id]
                      );
                    }}
                  >
                    <View style={{
                      width: 20, height: 20, marginRight: 8,
                      borderWidth: 1, borderColor: "#ccc",
                      backgroundColor: selectedUserIdsEdit.includes(user.id) ? "#0ff" : "#fff"
                    }} />
                    <Text style={{ color: "#fff" }}>{user.name} ({user.email})</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.containerbotoes}>
                <TouchableOpacity style={styles.button} onPress={handleEdit}>
                  <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
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

export default Curador;
