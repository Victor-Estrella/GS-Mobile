import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native';

interface AbrigoFormData {
    alimentos: string[];
    agua: number;
    roupas: string;
    medicamentos: string;
}

export default function InfoAbrigo() {
    const [form, setForm] = useState<AbrigoFormData>({
        alimentos: [''],
        agua: 0,
        roupas: '',
        medicamentos: '',
    });

    const handleAddAlimento = () => {
        setForm(prev => ({ ...prev, alimentos: [...prev.alimentos, ''] }));
    };

    const handleAlimentoChange = (value: string, idx: number) => {
        const novosAlimentos = [...form.alimentos];
        novosAlimentos[idx] = value;
        setForm(prev => ({ ...prev, alimentos: novosAlimentos }));
    };

    const handleSubmit = async () => {
        if (
            form.alimentos.some(alimento => !alimento.trim()) ||
            !form.agua ||
            !form.roupas ||
            !form.medicamentos
        ) {
            ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
            return;
        }

        try {
            const novoAbrigo = {
                alimentos: form.alimentos,
                agua: form.agua,
                roupas: form.roupas,
                medicamentos: form.medicamentos,
            };
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.LONG);
        } catch (e) {
            ToastAndroid.show('Erro ao cadastrar', ToastAndroid.LONG);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ maxWidth: 400, marginHorizontal: 'auto', padding: 16, flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Cadastro de Abrigo</Text>
                <View style={{ marginBottom: 12 }}>
                    <Text>Alimentos:</Text>
                    {form.alimentos.map((alimento, idx) => (
                        <TextInput
                            key={idx}
                            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 6 }}
                            placeholder={`Alimento ${idx + 1}`}
                            value={alimento}
                            onChangeText={value => handleAlimentoChange(value, idx)}
                        />
                    ))}
                    <TouchableOpacity onPress={handleAddAlimento} style={{ marginTop: 4, marginBottom: 4 }}>
                        <Text style={{ color: '#007bff' }}>+ Adicionar alimento</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Água (em litros):</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        placeholder="Em L"
                        value={form.agua ? form.agua.toString() : ''}
                        onChangeText={value => {
                            if (/^\d*$/.test(value)) {
                                setForm(prev => ({ ...prev, agua: value === '' ? 0 : Number(value) }));
                            }
                        }}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Roupas:</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        placeholder="Roupas disponíveis"
                        value={form.roupas}
                        onChangeText={value => setForm(prev => ({ ...prev, roupas: value }))}
                    />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text>Medicamentos:</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        placeholder="Medicamentos disponíveis"
                        value={form.medicamentos}
                        onChangeText={value => setForm(prev => ({ ...prev, medicamentos: value }))}
                    />
                </View>
                <Button title="Cadastrar" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}