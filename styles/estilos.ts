import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  // Formulário de Autenticação (Cadastro e Login)
  bg: {
    flex: 1,
    backgroundColor: "#81C784",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 32,
  },
  header: {
    width: "100%",
    paddingVertical: 24,
    alignItems: "center",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  tituloAutenticacao: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  form: {
    width: "100%",
    padding: 24,
    alignItems: "center",
  },
  inputAutenticacao: {
    width: "100%",
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
    color: "#222",
    fontFamily: "Inter",
    minHeight: 50,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#1E88E5",
  },
  buttonTextAutenticacao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },

  // Formulário de Informações do Abrigo
  cardInfo: {
    width: "80%",
    maxWidth: 420,
    height: 650,
    backgroundColor: "#fff",
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 32,
  },
  headerInfo: {
    width: "100%",
    paddingVertical: 24,
    alignItems: "center",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  formInfo: {
    width: "100%",
    alignItems: "center",
    padding: 24,
    paddingBottom: 40,
  },
  inputInfo: {
    width: "100%",
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    fontSize: 16,
    color: "#222",
  },
  addLink: {
    color: "#1E88E5",
    fontSize: 15,
    marginBottom: 30,
    fontWeight: "500",
  },
  buttonInfo: {
    width: "100%",
    backgroundColor: "#1E88E5",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  buttonTextInfo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
  },
});

export { styles };
