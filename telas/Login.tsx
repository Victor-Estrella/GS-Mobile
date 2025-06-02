import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../styles/estilos";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Botao from "../components/Botao";


interface LoginProps {
    navigation: NavigationProp<ParamListBase>;
}

const Login = (props: LoginProps): React.ReactElement => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const handleLogin = async (email: string, senha: string) => {
        if (!email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }
        try {
            const response = await fetch('http://192.168.0.24:8080/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            if (response.status === 401 || response.status === 403) {
                alert("Email ou senha incorretos.");
                return;
            } else if (response.status === 404) {
                alert("Usuário não encontrado.");
                return;
            } else if (!response.ok) {
                alert("Login falhou. Tente novamente.");
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.usuario && data.usuario.chaveAbrigo) {
                await AsyncStorage.setItem('abrigoId', data.usuario.chaveAbrigo.toString());
                props.navigation.navigate('Logado');
            } else {
                alert("Login falhou. Tente novamente.");
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
                    <Botao title="ENTRAR" onPress={() =>
                        handleLogin(email, senha)
                    }/>
                </View>
            </View>
        </View>
    )
}

export { Login };

