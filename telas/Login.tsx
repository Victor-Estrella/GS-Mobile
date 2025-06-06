import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../styles/estilos";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Botao from "../components/Botao";
import axios from "axios";
import LoginProps from "../types/LoginProps";

const Login = (props: LoginProps): React.ReactElement => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const logar = async (email: string, senha: string) => {
        if (!email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }

        if (senha.length < 8 || senha.length > 15) {
            alert("A senha deve ter entre 8 e 15 caracteres.");
            return;
        }

        try {
            const response = await axios.post('https://safehub-gs.onrender.com/usuarios/login', { 
                email, 
                senha 
            });
            const data = response.data;
            if (data.usuario && data.usuario.chaveAbrigo) {
                await AsyncStorage.setItem('abrigoId', data.usuario.chaveAbrigo.toString());
                await AsyncStorage.setItem('idUsuario', data.usuario.idUsuario.toString()); 
                props.navigation.navigate('Logado');
            } else {
                alert("Login falhou. Tente novamente.");
            }
        } catch (error: any) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                alert("Email ou senha incorretos.");
            } else if (error.response?.status === 404) {
                alert("Usuário não encontrado.");
            } else {
                alert("Erro de conexão");
            }
        }
    };

    return (
        <View style={styles.bg}>
            <View style={styles.card}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                    <Text style={styles.tituloAutenticacao}>LOGIN</Text>
                </LinearGradient>
                <View style={styles.form}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Email" value={email} onChangeText={setEmail}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry/>
                    <Botao title="ENTRAR" onPress={() =>
                        logar(email, senha)
                    }/>
                </View>
            </View>
        </View>
    )
}

export { Login };

