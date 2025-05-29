import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/estilos";
import BotaoProps from "../types/BotaoTipo";

interface CadastroProps {
    navigation: NavigationProp<ParamListBase>;
    onCadastro: (nome: string, email: string, numeroAbrigo: string, senha: string) => void;
}

const Cadastro = (props: CadastroProps): React.ReactElement => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [numeroAbrigo, setNumeroAbrigo] = useState("")
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.tituloAutenticacao}>Cadastro</Text>
            </View>
            <View style={{ flex: 3, width: '50%' }}>
                <View style={styles.viewInputAutenticacao}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor='white' placeholder="Nome" value={nome} onChangeText={setNome} />
                </View>
                <View style={styles.viewInputAutenticacao}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor='white' placeholder="Email" value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.viewInputAutenticacao}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor='white' placeholder="Numero do abrigo" value={numeroAbrigo} onChangeText={setNumeroAbrigo} />
                </View>
                <View style={styles.viewInputAutenticacao}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor='white' placeholder="Senha" value={senha} onChangeText={setSenha} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Botao title="Cadastrar" onPress={() => {
                        props.onCadastro(nome, email, numeroAbrigo, senha)
                        props.navigation.navigate("Login")
                    }} />
                </View>
            </View>
        </View>
    )
}


function Botao(props: BotaoProps) {
    return (
        <Pressable onPress={props.onPress}>
            <View style={{ borderRadius: 16, marginTop: 42, backgroundColor: 'green' }} >
                <Text style={styles.buttonTextAutenticacao}>
                    {props.title}
                </Text>
            </View>
        </Pressable>
    );
}

export { Cadastro };

