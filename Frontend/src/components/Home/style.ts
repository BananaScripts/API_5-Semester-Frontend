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
    fontSize: 30,
    paddingTop: "5%",
    paddingBottom: "5%",
    fontFamily: 'JetBrainsMono',
  },
  subtitulo: {
    color: "#fff",
    fontSize: 15,
    padding: 10,
    fontFamily: 'JetBrainsMono',
  },
  subtitulo2: {
    color: "#fff",
    fontSize: 12,
    padding: 10,
    fontFamily: 'JetBrainsMono',
  },
  subtitulo3: {
    color: "#fff",
    fontSize: 10,
    padding: 2,
    fontFamily: 'JetBrainsMono',
  },
  userText: {
    color: "#92FFFF",
    fontFamily: 'JetBrainsMono',
  },
  pesquisar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#92FFFF",
    fontFamily: 'JetBrainsMono',
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 5,
    fontSize: 16,
    fontFamily: 'JetBrainsMono',
  },
  chats: {
    height: 190, 
    backgroundColor: "#121212",
    borderColor: "#FC82FF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
    fontFamily: 'JetBrainsMono',
  },
  containerChats: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 5,
    paddingBottom: 10,
    fontFamily: 'JetBrainsMono',
  },
  agentesChats: {
    height: 130,
    width: 110,
    borderRadius: 8,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    fontFamily: 'JetBrainsMono',
  },
  imagemBots: {
    height: 95,
    width: 95,
    borderRadius: 10,
  },
  historico: {
    backgroundColor: "#121212",
    borderColor: "#9182FF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 7,
    justifyContent: "center",
    fontFamily: 'JetBrainsMono',
  },
  scrollContainer: {
    maxHeight: 250,
  },
  containerHistorico: {
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center", 
    gap: 8, 
    paddingHorizontal: 5,
    fontFamily: 'JetBrainsMono',
  },
  agentesHistorico: {
    height: 65,
    width: "95%",
    flexDirection: 'row',  
    borderRadius: 8,
    padding: 7,
    backgroundColor: "#333333",
    alignItems: "center",  
    gap: 10,
    fontFamily: 'JetBrainsMono',
  },
  imagemBotsHistorico: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  botInfo: {
    flexDirection: "column", 
    justifyContent: "center",
    width: 300,
    fontFamily: 'JetBrainsMono',
  },
});