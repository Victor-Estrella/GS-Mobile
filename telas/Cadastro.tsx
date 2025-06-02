import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, View, ToastAndroid } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from "../styles/estilos";
import Botao from "../components/Botao";
import axios from "axios";

interface CadastroProps {
    navigation: NavigationProp<ParamListBase>;
}

const Cadastro = (props: CadastroProps): React.ReactElement => {

    const handleCadastro = async () => {
        if (!nome || !email || !numeroAbrigo || !senha) {
            ToastAndroid.show('Preencha todos os campos.', ToastAndroid.SHORT);
            return;
        }
        if (senha.length < 8 || senha.length > 15) {
            ToastAndroid.show('A senha deve ter entre 8 e 15 caracteres.', ToastAndroid.SHORT);
            return;
        }

        // Verifica se o e-mail já existe
        try {
            const verificaEmail = await axios.get(`http://192.168.0.24:8080/usuarios`);
            const usuarios = verificaEmail.data;
            const emailJaExiste = Array.isArray(usuarios) && usuarios.some((u) => u.email === email);
            if (emailJaExiste) {
                ToastAndroid.show('Este e-mail já está cadastrado.', ToastAndroid.SHORT);
                return;
            }
        } catch (e) {
            // Se não conseguir verificar, segue para o cadastro normalmente
        }

        try {
            await axios.post('http://192.168.0.24:8080/usuarios', {
                nome,
                email,
                senha,
                chaveAbrigo: Number(numeroAbrigo)
            });
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT);
            props.navigation.navigate("Login");
        } catch (error: any) {
            if (error.response?.status === 409) {
                ToastAndroid.show('Este e-mail já está cadastrado.', ToastAndroid.SHORT);
            } else if (error.response?.status === 404) {
                ToastAndroid.show('Abrigo não encontrado.', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Erro ao cadastrar. Tente novamente.', ToastAndroid.SHORT);
            }
        }
    };
    
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [numeroAbrigo, setNumeroAbrigo] = useState("")
    return (
        <View style={styles.bg}>
            <View style={styles.card}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                    <Text style={styles.tituloAutenticacao}>CADASTRO</Text>
                </LinearGradient>
                <View style={styles.form}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Nome" value={nome} onChangeText={setNome}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Email" value={email} onChangeText={setEmail}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Numero do abrigo" value={numeroAbrigo} onChangeText={setNumeroAbrigo}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry/>
                    <Text style={{ color: "#B9B6B6", fontSize: 12, marginBottom: 8 }}>A senha deve ter entre 8 e 15 caracteres.</Text>
                    <Botao title="CADASTRAR" onPress={handleCadastro} />
                </View>
            </View>
        </View>
    )
}


export { Cadastro };

