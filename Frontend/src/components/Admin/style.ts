import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",  
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContainer: {
    flexGrow: 1,
    height: 1750,
  },
  titulo: {
    color: "#92FFFF",  
    fontSize: 36,  
    fontWeight: "bold",
    paddingVertical: 20,
    fontFamily: "JetBrainsMono",
    textAlign: "center",
  },
  containerTitulo: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30, 
  },
  dadosText: {
    color: "#FFF", 
    fontFamily: "JetBrainsMono",
    fontSize: 18,  
    paddingBottom: 8,  
  },
  containerUsuario: {
    backgroundColor: "#1E1E1E", 
    width: "90%", 
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,  
    elevation: 8,  
    gap: 10,  
    marginBottom: 30, 
  },
  input: {
    backgroundColor: "#2A2A2A",  
    color: "#FFF",
    fontFamily: "JetBrainsMono",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,  
    borderWidth: 1.5,
    borderColor: "#FFF",
    width: "100%",
  },
  inputTipo: {
    backgroundColor: "#2A2A2A",
    color: "#FFF",
    fontFamily: "JetBrainsMono",
    paddingVertical: 12, 
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FFF",
    width: "100%",
    height: 55, 
    justifyContent: "center",
  },
  button: {
    backgroundColor: '#92FFFF',
    paddingVertical: 12,
    alignItems: 'center',
    width: '40%',  
    borderRadius: 20,  
    borderColor: 'white',
    marginTop: 15,  
    marginBottom: 10,  
  },
  botaoTexto: {
    color: "#121212", 
    fontFamily: "JetBrainsMono",
    fontSize: 16, 
    fontWeight: "bold",
  },
  userText: {
    color: "#FFF",
    fontFamily: "JetBrainsMono",
    fontSize: 16,
  },
  containerVisualizar: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    maxHeight: 500,
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#333',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tableRow: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderColor: '#FFF',
    borderWidth: 1,
  },
  tableText: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 13,
  },
  containerEditar: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  buttonEdit: {
    backgroundColor: '#4756fc',
    alignItems: 'center',
    width: '15%',  
    borderColor: 'white',
    marginHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonDelete: {
    backgroundColor: '#bf3939',
    paddingVertical: 12,
    marginHorizontal: 20,
    alignItems: 'center',
    width: '15%',  
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
