import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity } from 'react-native';
// Se estiver usando expo, para copiar para a área de transferência:
import * as Clipboard from 'expo-clipboard';

interface AbrigoFormData {
    nome: string;
    localizacao: string;
    capacidadeMaxima: number;
    responsaveis: string;
}

export default function Abrigo() {
    const [form, setForm] = useState<AbrigoFormData>({
        nome: '',
        localizacao: '',
        capacidadeMaxima: 0,
        responsaveis: '',
    });
    const [abrigoId, setAbrigoId] = useState<string | null>(null);

    function gerarIdAleatorio() {
        // Gera um número aleatório de até 5 dígitos
        return Math.floor(10000 + Math.random() * 90000).toString();
    }

    const handleSubmit = () => {
        const novoId = gerarIdAleatorio();
        setAbrigoId(novoId);
        ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.LONG);
        setForm({
            nome: '',
            localizacao: '',
            capacidadeMaxima: 0,
            responsaveis: '',
        });
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
                    placeholder="Localização"
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