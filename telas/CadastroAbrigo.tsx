import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';

interface AbrigoFormData {
    nome: string;
    localizacao: string;
    capacidadeMaxima: number;
    responsaveis: string;
}

export default function CadastroAbrigo() {
    const [form, setForm] = useState<AbrigoFormData>({
        nome: '',
        localizacao: '',
        capacidadeMaxima: 0,
        responsaveis: '',
    });
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
        if (!form.nome || !form.localizacao || !form.capacidadeMaxima || !form.responsaveis) {
            ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
            return;
        }
        
        if (isNaN(form.capacidadeMaxima) || form.capacidadeMaxima <= 0) {
            ToastAndroid.show('Digite um número válido para capacidade', ToastAndroid.SHORT);
            return;
        }

        try {
            const coordenadas = await geocodeAddress(form.localizacao);
            const novoAbrigo = {
                id: gerarIdAleatorio(),
                nome: form.nome,
                capacidade: form.capacidadeMaxima,
                responsaveis: form.responsaveis,
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
        <View style={{ maxWidth: 400, marginHorizontal: 'auto', padding: 16, flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Cadastro de Abrigo</Text>
            <View style={{ marginBottom: 12 }}>
                <Text>Nome:</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                    placeholder="Nome"
                    value={form.nome}
                    onChangeText={value => setForm(prev => ({ ...prev, nome: value }))}
                />
            </View>
            <View style={{ marginBottom: 12 }}>
                <Text>Localização:</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                    placeholder="Ex: Avenida Paulista, 1578, São Paulo, Brasil"
                    value={form.localizacao}
                    onChangeText={value => setForm(prev => ({ ...prev, localizacao: value }))}
                />
            </View>
            <View style={{ marginBottom: 12 }}>
                <Text>Capacidade Máxima:</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                    placeholder="Capacidade Máxima"
                    value={form.capacidadeMaxima.toString()}
                    onChangeText={value => setForm(prev => ({ ...prev, capacidadeMaxima: Number(value) }))}
                    keyboardType="numeric"
                />
            </View>
            <View style={{ marginBottom: 12 }}>
                <Text>Responsáveis:</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                    placeholder="Responsáveis"
                    value={form.responsaveis}
                    onChangeText={value => setForm(prev => ({ ...prev, responsaveis: value }))}
                />
            </View>
            <Button title="Cadastrar" onPress={handleSubmit} />


            {abrigoId && (
                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ID do Abrigo:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ fontSize: 24, color: 'blue', marginRight: 8 }}>{abrigoId}</Text>
                        <TouchableOpacity onPress={copiarId} style={{ padding: 4 }}>
                            <Text style={{ fontSize: 22 }}>📋</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#888', fontSize: 12, marginTop: 4 }}>Toque no botão para copiar</Text>
                </View>
            )}
        </View>
    );
}