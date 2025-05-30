import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        // Aqui você pode adicionar a lógica para salvar as alterações do usuário
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
                        // Lógica para excluir a conta do usuário
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
        <View style={styles.container}>
            <Text style={styles.titulo}>Configurações</Text>
            <Text>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome"/>
            <Text>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu email" keyboardType="email-address" autoCapitalize="none"/>
            <Text>Localização (opcional):</Text>
            <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} placeholder="Digite sua localização"/>
            <Button title="Salvar Alterações" onPress={handleSalvar} />
            <View style={styles.divisor} />
            <Button title="Excluir Conta" color="red" onPress={handleExcluirConta}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    divisor: {
        height: 20,
    },
});