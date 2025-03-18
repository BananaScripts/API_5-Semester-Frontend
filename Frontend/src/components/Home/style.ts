import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 24,
  },
  userText: {
    color: "#26a3ff",
  },
  searchContainer: {
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
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 10,
  },
});
