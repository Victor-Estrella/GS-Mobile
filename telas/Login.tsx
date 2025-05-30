import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/estilos";
import BotaoProps from "../types/BotaoTipo";
import { LinearGradient } from "expo-linear-gradient";


interface LoginProps {
    navigation: NavigationProp<ParamListBase>;
    onLogin: (nome: string, senha: string) => void
}

const Login = (props: LoginProps): React.ReactElement => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
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



function Botao(props: BotaoProps) {
    return (
        <Pressable onPress={props.onPress} style={{ width: "100%" }}>
            <View style={styles.button}>
                <Text style={styles.buttonTextAutenticacao}>
                    {props.title}
                </Text>
            </View>
        </Pressable>
    );
}


export { Login };

