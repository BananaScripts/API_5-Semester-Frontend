import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  backButton: {
    marginRight: 10,
  },
  botImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  botName: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'JetBrainsMono',
  },
  content: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    paddingBottom: "5%",
    fontFamily: 'JetBrainsMono',
  },
  description: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    fontFamily: 'JetBrainsMono',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'JetBrainsMono',
    color: '#fff',
  },
  sendButton: {
    marginLeft: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#9182FF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    color: '#fff',
  },
});