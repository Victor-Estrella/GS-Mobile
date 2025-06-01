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

    function gerarIdAleatorio() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }

    const geocodeAddress = async (endereco: string) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: endereco,
                    format: 'json',
                },
                headers: {
                    'User-Agent': 'SmartAbrigoApp/1.0 (contato@exemplo.com)',
                    'Accept-Language': 'pt-BR',
                }
            });

            if (response.data.length > 0) {
                return {
                    latitude: parseFloat(response.data[0].lat),
                    longitude: parseFloat(response.data[0].lon),
                };
            } else {
                throw new Error("Endereço não encontrado");
            }
        } catch (error) {
            console.error('Erro no geocode:', error);
            throw error;
        }
    };

    const handleSubmit = async () => {
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
            const coordenadas = await geocodeAddress(localizacao);
            const novoAbrigo = {
                id: gerarIdAleatorio(),
                nome,
                capacidade: capacidadeNum,
                responsaveis,
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
                ocupado: 0,
            };
            console.log(novoAbrigo);
            setAbrigoId(novoAbrigo.id);
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.LONG);
        } catch (e) {
            ToastAndroid.show('Erro ao obter localização', ToastAndroid.LONG);
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
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Nome" value={nome} onChangeText={setNome}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Avenida Paulista, 1578, São Paulo" value={localizacao} onChangeText={setLocalizacao}/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Capacidade Máxima" value={capacidadeMaxima} onChangeText={setCapacidadeMaxima} keyboardType="numeric"/>
                    <TextInput style={styles.inputAutenticacao} placeholderTextColor="#B9B6B6" placeholder="Responsáveis" value={responsaveis} onChangeText={setResponsaveis}/>
                    <Botao title="CADASTRAR" onPress={() => {
                        handleSubmit();
                    }}/>
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