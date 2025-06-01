import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/estilos";
import BotaoProps from "../types/BotaoTipo";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Botao from "../components/Botao";


interface LoginProps {
    navigation: NavigationProp<ParamListBase>;
    onLogin: (nome: string, senha: string) => void
}

const Login = (props: LoginProps): React.ReactElement => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")


    const handleLogin = async (email: string, senha: string) => {
    try {
        const response = await fetch('http://SEU_BACKEND/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok && data.abrigoId) {
            await AsyncStorage.setItem('abrigoId', data.abrigoId.toString());
        } else {
            alert("Login falhou ou abrigo não encontrado");
        }
    } catch (err) {
        console.error(err);
        alert("Erro de conexão");
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
                    <Botao title="ENTRAR" onPress={() => {
                        props.onLogin(email, senha)
                    }}/>
                </View>
            </View>
        </View>
    )
}

export { Login };

