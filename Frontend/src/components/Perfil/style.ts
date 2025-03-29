import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  titulo: {
    color: "#fff",
    fontSize: 30,
    paddingTop: "5%",
    paddingBottom: "5%",
    fontFamily: 'JetBrainsMono',
    textAlign: 'center', 
  },
  containerTitulo: {
    alignItems: "flex-start",
    width: "90%",
  },
  userText: {
    color: "#92FFFF",
    fontFamily: 'JetBrainsMono',
    fontSize: 25,
  },
  dadosText: {
    color: "white",
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
  },
  fotoUsuario: {
    alignItems: "center",
  },
  foto: {
    borderRadius: 100,
    display: 'flex',
    height: 100,
    width: 100,
  },
  containerDados: {
    alignItems: "flex-start",
    width: "90%",
  },
  containerConfiguracoes: {
    backgroundColor: "#111",
    width: "90%",
    height: "40%",
    padding: 8,
    display: "flex", 
    borderColor: "#92FFFF",
    borderWidth: 3,
    borderRadius: 8,
  },
});
