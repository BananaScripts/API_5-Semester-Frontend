import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    gap: 10,
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
  },
  subtitulo: {
    color: "#fff",
    fontSize: 15,
    padding: 10,
  },
  subtitulo2: {
    color: "#fff",
    fontSize: 12,
    padding: 10,
  },
  subtitulo3: {
    color: "#fff",
    fontSize: 9,
    padding: 6,
  },
  userText: {
    color: "#26a3ff",
  },
  pesquisar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#26a3ff",
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 5,
    fontSize: 16,
  },
  chats: {
    height: 190, 
    backgroundColor: "#121212",
    borderColor: "#FC82FF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
  },
  containerChats: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    gap: 8, 
    paddingHorizontal: 5,
  },
  agentesChats: {
    height: 130,
    width: 110,
    borderRadius: 8,
    paddingTop: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
  },
  imagemBots: {
    height: 95,
    width: 95,
    borderRadius: 10,
  },
  historico: {
    height: 310, 
    backgroundColor: "#121212",
    borderColor: "#9182FF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
  },
  containerHistorico: {
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center", 
    gap: 8, 
    paddingHorizontal: 5,
  },
  agentesHistorico: {
    height: 65,
    width: "95%",
    flexDirection: 'column',
    borderRadius: 8,
    padding: 7,
    backgroundColor: "#333333",
  },
  imagemBotsHistorico: {
    height: 35,
    width: 35,
    borderRadius: 10,
  },
  agenteDescricao: {
    color: 'red',
  }
});