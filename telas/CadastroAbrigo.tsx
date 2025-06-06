import React, { useState } from 'react';
import { View, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import { styles } from '../styles/estilos';
import { LinearGradient } from 'expo-linear-gradient';
import Botao from '../components/Botao';

export default function CadastroAbrigo() {
    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [capacidadeMaxima, setCapacidadeMaxima] = useState('');
    const [responsaveis, setResponsaveis] = useState('');
    const [abrigoId, setAbrigoId] = useState<string | null>(null);

    const cadastrarAbrigo = async () => {
        if (!nome || !localizacao || !capacidadeMaxima || !responsaveis) {
            ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
            return;
        }

        const capacidadeNum = Number(capacidadeMaxima);
        if (isNaN(capacidadeNum) || capacidadeNum <= 0) {
            ToastAndroid.show('Digite um número válido para capacidade', ToastAndroid.SHORT);
            return;
        }

        try {
            const novoAbrigo = {
                nomeAbrigo: nome,
                capacidadePessoa: capacidadeNum,
                nomeResponsavel: responsaveis,
                localizacao
            };
            const response = await axios.post('https://safehub-gs.onrender.com/abrigos', novoAbrigo);
            setAbrigoId(response.data.idCadastroAbrigo?.toString() || '');
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.LONG);
        } catch (e) {
            ToastAndroid.show('Erro ao cadastrar abrigo', ToastAndroid.LONG);
        }
    };

    const copiarId = async () => {
        if (abrigoId) {
            await Clipboard.setStringAsync(abrigoId);
            ToastAndroid.show('ID copiado!', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.bg}>
            <View style={styles.card}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                    <Text style={styles.tituloAutenticacao}>CADASTRO DE ABRIGO</Text>
                </LinearGradient>
                <View style={styles.form}>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Nome do Abrigo" value={nome} onChangeText={setNome}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Avenida Paulista, 1230, São Paulo" value={localizacao} onChangeText={setLocalizacao}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Capacidade Máxima" value={capacidadeMaxima} onChangeText={setCapacidadeMaxima} keyboardType="numeric"/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Responsável" value={responsaveis} onChangeText={setResponsaveis}/>
                    <Botao title="CADASTRAR" onPress={cadastrarAbrigo}/>
                </View>
            </View>

            {abrigoId && (
                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ID do Abrigo:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ fontSize: 24, color: 'blue', marginRight: 8 }}>{abrigoId}</Text>
                        <TouchableOpacity onPress={copiarId} style={{ padding: 4 }}>
                            <Text style={{ fontSize: 22 }}>📋</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 4 }}>Toque no botão para copiar</Text>
                </View>
            )}
        </View>
    );
}