import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  titulo: {
    color: "#fff",
    fontSize: 30,
    paddingBottom: "5%",
    paddingTop: "5%",
    fontFamily: 'JetBrainsMono',
  },
  searchAndTagsWrapper: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FC82FF",
    marginBottom: 10,
    padding: 10,
  },
  searchAndTagsContainer: {
    marginBottom: 10,
  },
  input: {
    color: "#fff",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontFamily: 'JetBrainsMono',
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTag: {
    backgroundColor: "#FC82FF",
  },
  tagText: {
    color: "#fff",
    fontFamily: 'JetBrainsMono',
  },
  botsWrapper: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FC82FF",
    padding: 10,
    paddingBottom: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  botCard: {
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  botImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  botInfo: {
    alignItems: "center",
  },
  botTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'JetBrainsMono',
    marginBottom: 5,
  },
  botDescription: {
    color: "#fff",
    fontSize: 12,
    fontFamily: 'JetBrainsMono',
  },
});