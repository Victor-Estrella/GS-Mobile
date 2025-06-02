import React, { useState } from "react";
import { Text, TextInput, View, ScrollView, ToastAndroid, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles as globalStyles, styles } from "../styles/estilos";
import { useNavigation } from "@react-navigation/native";
import Botao from "../components/Botao";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuracoes() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigation = useNavigation() as any;

    const handleSalvar = async () => {
        if (!nome.trim() || !email.trim()) {
            ToastAndroid.show("Por favor, preencha nome e email para atualizar.", ToastAndroid.SHORT);
            return;
        }
        try {
            const idUsuario = await AsyncStorage.getItem('idUsuario');
            const idAbrigo = await AsyncStorage.getItem('abrigoId');
            if (!idUsuario) {
                ToastAndroid.show("ID do usuário não encontrado.", ToastAndroid.SHORT);
                return;
            }
            if (!idAbrigo) {
                ToastAndroid.show("ID do abrigo não encontrado.", ToastAndroid.SHORT);
                return;
            }

            // Busca o usuário atual para pegar a senha antiga, se necessário
            let senhaParaEnviar = senha;
            if (!senha) {
                const usuarioAtual = await axios.get(`http://192.168.0.24:8080/usuarios/${idUsuario}`);
                senhaParaEnviar = usuarioAtual.data.senha;
            }

            await axios.put(`http://192.168.0.24:8080/usuarios/${idUsuario}`, {
                nome,
                email,
                senha: senhaParaEnviar,
                chaveAbrigo: Number(idAbrigo)
            });
            ToastAndroid.show("Informações atualizadas com sucesso!", ToastAndroid.SHORT);

            // Limpa o formulário
            setNome("");
            setEmail("");
            setSenha("");

            navigation.navigate("Dashboard");
        } catch (error) {
            ToastAndroid.show("Não foi possível atualizar. Tente novamente.", ToastAndroid.SHORT);
        }
    };

    const handleExcluirConta = async () => {
        Alert.alert(
            "Excluir Conta",
            "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const idUsuario = await AsyncStorage.getItem('idUsuario');
                            if (!idUsuario) {
                                ToastAndroid.show("ID do usuário não encontrado.", ToastAndroid.SHORT);
                                return;
                            }
                            await axios.delete(`http://192.168.0.24:8080/usuarios/${idUsuario}`);
                            ToastAndroid.show("Sua conta foi excluída com sucesso.", ToastAndroid.SHORT);
                            navigation.navigate("Deslogado");
                        } catch (error) {
                            ToastAndroid.show("Não foi possível excluir a conta. Tente novamente.", ToastAndroid.SHORT);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.bg}>
            <View style={styles.cardCondig}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerConfig}>
                    <Text style={styles.tituloAutenticacao}>Configurações</Text>
                </LinearGradient>
                <ScrollView contentContainerStyle={styles.formConfig} keyboardShouldPersistTaps="handled">
                    <Text style={styles.labelConfig}>Nome</Text>
                    <TextInput style={styles.inputConfig} value={nome} onChangeText={setNome} placeholder="Digite seu nome" placeholderTextColor="#B9B6B6"/>
                    
                    <Text style={styles.labelConfig}>Email</Text>
                    <TextInput style={styles.inputConfig} value={email} onChangeText={setEmail} placeholder="Digite seu email" placeholderTextColor="#B9B6B6" keyboardType="email-address" autoCapitalize="none"/>
                    
                    <Text style={styles.labelConfig}>Senha (opcional)</Text>
                    <TextInput
                        style={styles.inputConfig}
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Digite sua nova senha (ou deixe em branco)"
                        placeholderTextColor="#B9B6B6"
                        secureTextEntry
                    />
                    
                    <Botao title="SALVAR ALTERAÇÕES" onPress={handleSalvar} />
                    <View style={{ height: 16 }} />
                    <Botao title="EXCLUIR CONTA" onPress={handleExcluirConta} cor="red" />
                </ScrollView>
            </View>
        </View>
    );
}