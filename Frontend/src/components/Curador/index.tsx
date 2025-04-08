import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import AgentService from "../../services/agentService";
import useAuth from "../../Hooks/useAuth";

const Curador = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.containerUsuario}>
          <Text style={styles.dadosText}>Cadastrar Agente</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.inputbd}
            placeholder="Base de dados"
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={alert}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerVisualizar}>
          <Text style={styles.dadosText}>Visualizar Agentes</Text>

          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome ou email"
            placeholderTextColor="#888"
          />

          
        </View>

        <View style={styles.containerEditar}>
          <Text style={styles.dadosText}>Editar Agentes</Text>

          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome ou email"
            placeholderTextColor="#888"
          />

          
        </View>

        
      </View>
    </ScrollView>
  );
};

export default Curador;
