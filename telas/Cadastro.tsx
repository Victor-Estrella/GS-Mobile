import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, View, ToastAndroid } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from "../styles/estilos";
import Botao from "../components/Botao";

interface CadastroProps {
    navigation: NavigationProp<ParamListBase>;
    onCadastro: (nome: string, email: string, numeroAbrigo: string, senha: string) => void;
}

const Cadastro = (props: CadastroProps): React.ReactElement => {

    const handleCadastro = () => {
    if (!nome || !email || !numeroAbrigo || !senha) {
        ToastAndroid.show('Preencha todos os campos.', ToastAndroid.SHORT);
        return;
    }
    props.onCadastro(nome, email, numeroAbrigo, senha);
    props.navigation.navigate("Login");
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
                    <Botao title="CADASTRAR" onPress={handleCadastro}/>
                </View>
            </View>
        </View>
    )
}


export { Cadastro };

