
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
    fontSize: 20,
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
  historico: {
    backgroundColor: "#121212",
    borderColor: "#9182FF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
  },
  scrollContainer: {
    maxHeight: 1400,
  },
  containerHistorico: {
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center", 
    gap: 8, 
    paddingHorizontal: 5,
  },
  agentesHistorico: {
    height: 90,
    width: "100%",
    flexDirection: 'row',  
    borderRadius: 8,
    padding: 7,
    backgroundColor: "#333333",
    alignItems: "center",  
    gap: 10,
  },
  imagemBotsHistorico: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  botInfo: {
    flexDirection: "column", 
    justifyContent: "center",
    width: 275,
  },
});
