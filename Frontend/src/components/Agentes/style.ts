import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 5,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    paddingBottom: "5%",
    paddingTop: "10%",
    fontFamily: 'JetBrainsMono',
    paddingLeft: 7,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 10,
    borderColor: "#9182FF",
    borderWidth: 2,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    marginBottom: 30,
  },
  botCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  botImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  botInfo: {
    flex: 1,
  },
  botName: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'JetBrainsMono',
  },
  botDescription: {
    color: "#ccc",
    fontSize: 16,
    fontFamily: 'JetBrainsMono',
  },
});