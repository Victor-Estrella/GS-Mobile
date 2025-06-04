import React, { useState, useEffect } from "react";
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

    const [nomeAbrigo, setNomeAbrigo] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [nomeResponsavel, setNomeResponsavel] = useState("");

    const navigation = useNavigation() as any;

    const atualizarConta = async () => {
        if (!nome.trim() && !email.trim() && !senha.trim() && !nomeAbrigo.trim() && !capacidade.trim() && !localizacao.trim()) {
            ToastAndroid.show("Preencha pelo menos um campo para atualizar.", ToastAndroid.SHORT);
            return;
        }
        try {
            const idUsuario = await AsyncStorage.getItem('idUsuario');
            const idAbrigo = await AsyncStorage.getItem('abrigoId');
            if (!idUsuario || !idAbrigo) {
                ToastAndroid.show("ID do usuário ou abrigo não encontrado.", ToastAndroid.SHORT);
                return;
            }

            let senhaParaEnviar = senha;
            if (!senha && (nome.trim() || email.trim())) {
                const usuarioAtual = await axios.get(`http://192.168.0.24:8080/usuarios/${idUsuario}`);
                senhaParaEnviar = usuarioAtual.data.senha;
            }

            // Busca dados atuais do abrigo se algum campo do abrigo for vazio
            let nomeAbrigoParaEnviar = nomeAbrigo;
            let capacidadeParaEnviar = capacidade;
            let localizacaoParaEnviar = localizacao;
            let nomeResponsavelParaEnviar = nomeResponsavel;
            if (!nomeAbrigo.trim() || !capacidade.trim() || !localizacao.trim() || !nomeResponsavel.trim()) {
                const abrigoAtual = await axios.get(`http://192.168.0.24:8080/abrigos/${idAbrigo}`);
                if (!nomeAbrigo.trim()) nomeAbrigoParaEnviar = abrigoAtual.data.nomeAbrigo || "";
                if (!capacidade.trim()) capacidadeParaEnviar = abrigoAtual.data.capacidadePessoa?.toString() || "";
                if (!localizacao.trim()) localizacaoParaEnviar = abrigoAtual.data.localizacao || "";
                if (!nomeResponsavel.trim()) nomeResponsavelParaEnviar = abrigoAtual.data.nomeResponsavel || "";
            }

            // Só envia PUT do usuário se algum campo foi preenchido
            if (nome.trim() || email.trim() || senha.trim()) {
                await axios.put(`http://192.168.0.24:8080/usuarios/${idUsuario}`, {
                    ...(nome.trim() && { nome }),
                    ...(email.trim() && { email }),
                    ...(senhaParaEnviar && { senha: senhaParaEnviar }),
                    chaveAbrigo: Number(idAbrigo)
                });
            }

            // Só envia PUT do abrigo se algum campo foi preenchido
            if (nomeAbrigo.trim() || capacidade.trim() || localizacao.trim() || nomeResponsavel.trim()) {
                await axios.put(`http://192.168.0.24:8080/abrigos/${idAbrigo}`, {
                    nomeAbrigo: nomeAbrigoParaEnviar,
                    capacidadePessoa: Number(capacidadeParaEnviar),
                    localizacao: localizacaoParaEnviar,
                    nomeResponsavel: nomeResponsavelParaEnviar
                });
            }

            ToastAndroid.show("Informações atualizadas com sucesso!", ToastAndroid.SHORT);

            setNome("");
            setEmail("");
            setSenha("");
            setNomeAbrigo("");
            setCapacidade("");
            setLocalizacao("");
            setNomeResponsavel("");

            navigation.navigate("Dashboard");
        } catch (error) {
            ToastAndroid.show("Não foi possível atualizar. Tente novamente.", ToastAndroid.SHORT);
        }
    };

    const excluirConta = async () => {
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

    const excluirAbrigo = async () => {
        Alert.alert(
            "Excluir Tudo",
            "Tem certeza que deseja excluir TODO o abrigo? Isso irá deletar o estoque, sua conta e o abrigo permanentemente. Esta ação não poderá ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir Tudo",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const idAbrigo = await AsyncStorage.getItem('abrigoId');
                            const idUsuario = await AsyncStorage.getItem('idUsuario');
                            if (!idAbrigo || !idUsuario) {
                                ToastAndroid.show("ID do abrigo ou usuário não encontrado.", ToastAndroid.SHORT);
                                return;
                            }
                            await axios.delete(`http://192.168.0.24:8080/estoques/abrigo/${idAbrigo}`);
                            await axios.delete(`http://192.168.0.24:8080/usuarios/${idUsuario}`);
                            await axios.delete(`http://192.168.0.24:8080/abrigos/${idAbrigo}`);
                            ToastAndroid.show("Abrigo, estoque e conta excluídos com sucesso.", ToastAndroid.LONG);
                            navigation.navigate("Deslogado");
                        } catch (error) {
                            ToastAndroid.show("Não foi possível excluir tudo. Tente novamente.", ToastAndroid.SHORT);
                        }
                    }
                }
            ]
        );
    };

    const deslogar = async () => {
        await AsyncStorage.clear();
        ToastAndroid.show("Você saiu da conta.", ToastAndroid.SHORT);
        navigation.navigate("Deslogado");
    };

    return (
        <View style={styles.bg}>
            <View style={{position: "absolute", top: 12, right: 12, width: 120}}>
                <Botao title="DESLOGAR" onPress={deslogar} cor="#888" />
            </View>
            <View style={styles.cardCondig}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerConfig}>
                    <Text style={styles.tituloAutenticacao}>Configurações</Text>
                </LinearGradient>
                <ScrollView contentContainerStyle={styles.formConfig} keyboardShouldPersistTaps="handled">
                    {/* CAMPOS DO USUARIO */}
                    <Text style={styles.labelConfig}>Nome</Text>
                    <TextInput style={styles.inputConfig} value={nome} onChangeText={setNome} placeholder="Digite seu nome" placeholderTextColor="#B9B6B6"/>
                    
                    <Text style={styles.labelConfig}>Email</Text>
                    <TextInput style={styles.inputConfig} value={email} onChangeText={setEmail} placeholder="Digite seu email" placeholderTextColor="#B9B6B6" keyboardType="email-address" autoCapitalize="none"/>
                    
                    <Text style={styles.labelConfig}>Senha (opcional)</Text>
                    <TextInput style={styles.inputConfig} value={senha} onChangeText={setSenha} placeholder="Digite sua nova senha (ou deixe em branco)" placeholderTextColor="#B9B6B6" secureTextEntry/>

                    {/* CAMPOS DO ABRIGO */}
                    <Text style={styles.labelConfig}>Nome do Abrigo</Text>
                    <TextInput style={styles.inputConfig} value={nomeAbrigo} onChangeText={setNomeAbrigo} placeholder="Nome do abrigo" placeholderTextColor="#B9B6B6"/>
                    
                    <Text style={styles.labelConfig}>Capacidade</Text>
                    <TextInput style={styles.inputConfig} value={capacidade} onChangeText={setCapacidade} placeholder="Capacidade máxima" placeholderTextColor="#B9B6B6" keyboardType="numeric"/>
                    
                    <Text style={styles.labelConfig}>Localização (opcional)</Text>
                    <TextInput style={styles.inputConfig} value={localizacao} onChangeText={setLocalizacao} placeholder="Avenida Paulista, 1230, São Paulo" placeholderTextColor="#B9B6B6"/>

                    <Text style={styles.labelConfig}>Nome do Responsável</Text>
                    <TextInput style={styles.inputConfig} value={nomeResponsavel} onChangeText={setNomeResponsavel} placeholder="Nome do responsável" placeholderTextColor="#B9B6B6"/>

                    <Botao title="SALVAR ALTERAÇÕES" onPress={atualizarConta} />
                    <View style={{ height: 16 }} />
                    <Botao title="EXCLUIR CONTA" onPress={excluirConta} cor="red" />
                    <View style={{ height: 16 }} />
                    <Botao title="EXCLUIR TUDO" onPress={excluirAbrigo} cor="red" />
                </ScrollView>
            </View>
        </View>
    );
}