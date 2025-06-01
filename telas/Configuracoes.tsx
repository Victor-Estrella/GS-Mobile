import React, { useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles as globalStyles, styles } from "../styles/estilos";
import { useNavigation } from "@react-navigation/native";
import BotaoProps from "../types/BotaoTipo";
import Botao from "../components/Botao";

export default function Configuracoes() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const navigation = useNavigation() as any;

    const handleSalvar = () => {
        if (!nome.trim() || !email.trim()) {
            Alert.alert("Atenção", "Por favor, preencha nome e email para atualizar.");
            return;
        }
        Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
    };

    const handleExcluirConta = () => {
        Alert.alert(
            "Excluir Conta",
            "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir", style: "destructive", onPress: () => {
                        Alert.alert("Conta excluída", "Sua conta foi excluída com sucesso.", [
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.navigate("Deslogado");
                                }
                            },
                        ]);
                    }
                },
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
                    
                    <Text style={styles.labelConfig}>Localização (opcional)</Text>
                    <TextInput style={styles.inputConfig} value={localizacao} onChangeText={setLocalizacao} placeholder="Digite sua localização" placeholderTextColor="#B9B6B6"/>
                    
                    <Botao title="SALVAR ALTERAÇÕES" onPress={handleSalvar} />
                    <View style={{ height: 16 }} />
                    <Botao title="EXCLUIR CONTA" onPress={handleExcluirConta} cor="red" />
                </ScrollView>
            </View>
        </View>
    );
}