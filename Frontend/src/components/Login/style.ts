import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#181818',
        gap: 15,
        alignItems: 'center',
        fontFamily: 'JetBrainsMono',
      },
      logo: {
        width: 70,
        height: 70,
        marginBottom: 50,
      },
      input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor: 'gray',
        width: '80%',
        fontFamily: 'JetBrainsMono',
      },
      button: {
        backgroundColor: '#92FFFF',
        padding: 10,
        alignItems: 'center',
        width: '30%',
        display: 'flex',
        borderRadius: 15,
        borderColor: 'white',
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'JetBrainsMono',
      },
});
