import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import useAuth from "../../Hooks/useAuth";
import AgentService from "../../services/agentService";
import { styles } from "./style";

const Curador = () => {
  const { user: currentUser } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [config, setConfig] = useState<string>("{}");
  const [agents, setAgents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState("");         
  const [editDescription, setEditDescription] = useState(""); 
  const [editConfig, setEditConfig] = useState<string>("{}");
  const [editingAgent, setEditingAgent] = useState<any>(null);

  const fetchAgents = async () => {
    try {
      const response = await AgentService.getAllAgents(1, 20);
      const mappedAgents = response.items.map((agent: any) => ({
        agent_id: agent.agentId,
        agent_name: agent.name,
        agent_description: agent.description,
        agent_config: agent.config,
        status: agent.status,
        created_by_user_id: agent.createdByUserId,
        created_at: agent.createdAt,
        updated_at: agent.updatedAt,
      }));
      setAgents(mappedAgents);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar agentes.");
    }
  };

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
        Config: JSON.parse(config),
      };
      await AgentService.createAgent(agentData);
      setName("");
      setDescription("");
      setConfig("{}");
      Alert.alert("Sucesso", "Agente criado com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar agente.");
    }
  };

  const openEditModal = (agent: any) => {
    setEditingAgent(agent);
    setEditName(agent.agent_name || agent.name || "");
    setEditDescription(agent.agent_description || agent.description || "");
    setEditConfig(JSON.stringify(agent.agent_config || agent.config || "{}"));
    setModalVisible(true);
  };

  const handleEdit = async () => {
    if (!editingAgent) return; 
  
    const updatedData: Partial<any> = {};
  
    if (editName) updatedData.Name = editName; 
    if (editDescription) updatedData.Description = editDescription;
  
    let parsedConfig;
    try {
      parsedConfig = JSON.parse(editConfig);
      updatedData.Config = parsedConfig;  
    } catch (error) {
      Alert.alert("Erro", "A configuração deve ser um JSON válido.");
      return; 
    }
  
    try {
      await AgentService.updateAgent(editingAgent.agent_id, updatedData);
      Alert.alert("Sucesso", "Agente atualizado com sucesso!");

      setModalVisible(false);
      fetchAgents();
    } catch (error) {
      console.error("Erro ao editar agente", error);
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
      console.error(error);
      Alert.alert("Erro", "Não foi possível deletar agente.");
    }
  };

  const filtered = agents.filter(a =>
    (a.agent_name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Formulário de cadastro de agentes */}
        <View style={styles.containerUsuario}>
          <Text style={styles.dadosText}>Cadastrar Agente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.inputbd}
            placeholder="Config (JSON)"
            value={config}
            onChangeText={setConfig}
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de agentes */}
        <View style={styles.containerVisualizar}>
          <Text style={styles.dadosText}>Visualizar Agentes</Text>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
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
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Agente</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Nome"
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Descrição"
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.inputbd}
                value={editConfig}
                onChangeText={setEditConfig}
                placeholder="Config (JSON)"
                placeholderTextColor="#888"
                multiline
              />
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
