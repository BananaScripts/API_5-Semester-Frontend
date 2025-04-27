import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal, FlatList } from "react-native";
import { styles } from "./style";
import AgentService from "../../services/agentService";

const Curador = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [config, setConfig] = useState("{}");
  const [agents, setAgents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedConfig, setEditedConfig] = useState("{}");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await AgentService.getAllAgents();
      setAgents(response.items);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar agentes.");
    }
  };

  const handleCreateAgent = async () => {
    try {
      const newAgent = {
        Name: name,
        Description: description,
        Config: JSON.parse(config),
      };
      await AgentService.createAgent({
        Name: name,
        Description: description,
        Config: JSON.parse(config),
      });
      fetchAgents();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar agente.");
    }
  };

  const handleEditAgent = (agent: any) => {
    setSelectedAgent(agent);
    setEditedName(agent.agent_name);
    setEditedDescription(agent.agent_description);
    setEditedConfig(JSON.stringify(agent.agent_config));
    setEditMode(true);
  };

  const handleUpdateAgent = async () => {
    if (!selectedAgent) return;

    try {
      const updatedAgent = {
        Name: editedName,
        Description: editedDescription,
        Config: JSON.parse(editedConfig),
      };
      await AgentService.updateAgent(selectedAgent.agent_id, updatedAgent);
      Alert.alert("Sucesso", "Agente atualizado com sucesso!");
      setEditMode(false);
      setSelectedAgent(null);
      fetchAgents();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar agente.");
    }
  };

  const handleDeleteAgent = async (id: number) => {
    try {
      await AgentService.deleteAgent(id);
      Alert.alert("Sucesso", "Agente deletado com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível deletar agente.");
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.agent_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        

        <View style={styles.containerUsuario}>
          <Text style={styles.dadosText}>Cadastrar Agente</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.inputbd}
            placeholder="Base de dados (JSON)"
            placeholderTextColor="#888"
            value={config}
            onChangeText={setConfig}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateAgent}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerVisualizar}>
          <Text style={styles.dadosText}>Visualizar Agentes</Text>

          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {filteredAgents.map(agent => (
            <View key={agent.agent_id} style={styles.agentCard}>
              <Text style={styles.agentName}>{agent.agent_name}</Text>
              <Text style={styles.agentDescription}>{agent.agent_description}</Text>

              <View style={styles.agentActions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditAgent(agent)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAgent(agent.agent_id)}>
                  <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Modal visible={editMode} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.dadosText}>Editar Agente</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={editedDescription}
              onChangeText={setEditedDescription}
            />
            <TextInput
              style={styles.inputbd}
              placeholder="Base de dados (JSON)"
              value={editedConfig}
              onChangeText={setEditedConfig}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateAgent}>
              <Text style={styles.botaoTexto}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditMode(false)}>
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    </ScrollView>
  );
};

export default Curador;
