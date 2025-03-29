import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",  // Fundo mais escuro para a área principal
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titulo: {
    color: "#92FFFF",  // Cor de destaque
    fontSize: 36,  // Tamanho de fonte maior para o título
    fontWeight: "bold",
    paddingVertical: 20,
    fontFamily: "JetBrainsMono",
    textAlign: "center",
  },
  containerTitulo: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,  // Espaço extra abaixo do título
  },
  dadosText: {
    color: "#FFF",  // Texto branco para boa legibilidade
    fontFamily: "JetBrainsMono",
    fontSize: 18,  // Aumentar o tamanho da fonte para tornar mais legível
    paddingBottom: 8,  // Espaço adicional entre os elementos
  },
  containerUsuario: {
    backgroundColor: "#1E1E1E", 
    width: "90%",  // Melhor controle de largura
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,  // Sombra mais suave e sutil
    elevation: 8,  // Aumentar a elevação para destaque
    gap: 10,  // Aumentar o espaço entre os elementos
    marginBottom: 30,  // Espaço inferior para separar de outros componentes
  },
  input: {
    backgroundColor: "#2A2A2A",  // Cor de fundo dos inputs
    color: "#FFF",
    fontFamily: "JetBrainsMono",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,  // Maior espaçamento entre os campos
    borderWidth: 1.5,
    borderColor: "#FFF",
    width: "100%",
  },
  inputTipo: {
    backgroundColor: "#2A2A2A",
    color: "#FFF",
    fontFamily: "JetBrainsMono",
    paddingVertical: 12,  // Mais espaçamento vertical
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FFF",
    width: "100%",
    height: 55,  // Ajuste para ficar mais confortável de usar
    justifyContent: "center",
  },
  button: {
    backgroundColor: '#92FFFF',
    paddingVertical: 12,  // Mais espaço interno para o botão
    alignItems: 'center',
    width: '40%',  // Aumenta a largura para melhorar a acessibilidade
    borderRadius: 20,  // Bordas mais arredondadas
    borderColor: 'white',
    marginTop: 15,  // Mais espaçamento entre os botões
    marginBottom: 10,  // Espaçamento inferior para separar de outros botões
  },
  botaoTexto: {
    color: "#121212",  // Cor do texto dentro do botão
    fontFamily: "JetBrainsMono",
    fontSize: 16,  // Aumentar o tamanho da fonte
    fontWeight: "bold",
  },
  
  // Estilos para a lista de usuários
  userListContainer: {
    width: "100%",
    marginTop: 30,
    paddingTop: 15,
  },
  userItem: {
    backgroundColor: "#2A2A2A",
    padding: 18,  // Mais espaçamento dentro de cada item
    borderRadius: 12,
    marginBottom: 12,  // Mais espaçamento entre os itens
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  userText: {
    color: "#FFF",
    fontFamily: "JetBrainsMono",
    fontSize: 16,
  },
  editText: {
    color: "#92FFFF",
    fontFamily: "JetBrainsMono",
    fontSize: 15,
    marginTop: 8,
    textDecorationLine: "underline",
  },

  // Estilos para os botões de edição e exclusão
  editButton: {
    backgroundColor: '#92FFFF',
    padding: 12,
    alignItems: 'center',
    width: '40%',  // Botões mais largos
    borderRadius: 20,
    borderColor: 'white',
    marginTop: 15,
  },
  deleteButton: {
    backgroundColor: '#FF4747',
    padding: 12,
    alignItems: 'center',
    width: '40%',
    borderRadius: 20,
    borderColor: 'white',
    marginTop: 15,
  },
});
