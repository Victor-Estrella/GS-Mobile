import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../components/Botao';

export default function InfoAbrigo() {
    const [pessoas, setPessoas] = useState('');
    const [alimentos, setAlimentos] = useState<{ nome: string; quantidade: string }[]>([{ nome: '', quantidade: '' }]);
    const [agua, setAgua] = useState('');
    const [roupas, setRoupas] = useState<{ nome: string; quantidade: string }[]>([{ nome: '', quantidade: '' }]);
    const [medicamentos, setMedicamentos] = useState<{ nome: string; quantidade: string }[]>([{ nome: '', quantidade: '' }]);

    const handleAddAlimento = () => setAlimentos(prev => [...prev, { nome: '', quantidade: '' }]);
    const handleAlimentoChange = (value: string, idx: number, field: 'nome' | 'quantidade') => {
        const novos = [...alimentos];
        novos[idx][field] = value;
        setAlimentos(novos);
    };

    const handleAddRoupa = () => setRoupas(prev => [...prev, { nome: '', quantidade: '' }]);
    const handleRoupaChange = (value: string, idx: number, field: 'nome' | 'quantidade') => {
        const novos = [...roupas];
        novos[idx][field] = value;
        setRoupas(novos);
    };

    const handleAddMedicamento = () => setMedicamentos(prev => [...prev, { nome: '', quantidade: '' }]);
    const handleMedicamentoChange = (value: string, idx: number, field: 'nome' | 'quantidade') => {
        const novos = [...medicamentos];
        novos[idx][field] = value;
        setMedicamentos(novos);
    };

    const handleSubmit = async () => {
        const parsedPessoas = parseInt(pessoas);
        const parsedAgua = parseFloat(agua);

        if (
            isNaN(parsedPessoas) ||
            isNaN(parsedAgua) ||
            alimentos.some(a => !a.nome.trim() || !a.quantidade.trim()) ||
            roupas.some(r => !r.nome.trim() || !r.quantidade.trim()) ||
            medicamentos.some(m => !m.nome.trim() || !m.quantidade.trim())
        ) {
            alert('Preencha todos os campos corretamente');
            return;
        }

        try {
            const abrigoId = await AsyncStorage.getItem('abrigoId');

            if (!abrigoId) {
                alert("ID do abrigo não encontrado. Faça login novamente.");
                return;
            }

            const body = {
                abrigoId: parseInt(abrigoId),
                pessoas: parsedPessoas,
                agua: parsedAgua,
                alimentos,
                roupas,
                medicamentos
            };

            const response = await fetch('http://SEU_BACKEND/api/estoques', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                alert('Erro ao cadastrar estoque');
                return;
            }

            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar dados');
        }
    };

    return (
        <View style={styles.bg}>
            <View style={styles.cardInfo}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerInfo}>
                    <Text style={styles.tituloAutenticacao}>CADASTRO DE ABRIGO</Text>
                </LinearGradient>
                <ScrollView contentContainerStyle={styles.formInfo} style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <TextInput style={styles.inputInfo} placeholder="Pessoas Abrigadas" placeholderTextColor="#B9B6B6" value={pessoas} onChangeText={setPessoas} keyboardType="numeric" />

                    {alimentos.map((alimento, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput
                                style={[styles.inputInfo, { flex: 2 }]}
                                placeholder="Alimento"
                                placeholderTextColor="#B9B6B6"
                                value={alimento.nome}
                                onChangeText={value => handleAlimentoChange(value, idx, 'nome')}
                            />
                            <TextInput
                                style={[styles.inputInfo, { flex: 1 }]}
                                placeholder="Qtd."
                                placeholderTextColor="#B9B6B6"
                                value={alimento.quantidade}
                                onChangeText={value => handleAlimentoChange(value, idx, 'quantidade')}
                                keyboardType="numeric"
                            />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddAlimento}>
                        <Text style={styles.addLink}>+ Adicionar alimento</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.inputInfo} placeholder="Litros disponíveis" placeholderTextColor="#B9B6B6" value={agua} onChangeText={setAgua} keyboardType="numeric" />

                    {roupas.map((roupa, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput
                                style={[styles.inputInfo, { flex: 2 }]}
                                placeholder="Roupa"
                                placeholderTextColor="#B9B6B6"
                                value={roupa.nome}
                                onChangeText={value => handleRoupaChange(value, idx, 'nome')}
                            />
                            <TextInput
                                style={[styles.inputInfo, { flex: 1 }]}
                                placeholder="Qtd."
                                placeholderTextColor="#B9B6B6"
                                value={roupa.quantidade}
                                onChangeText={value => handleRoupaChange(value, idx, 'quantidade')}
                                keyboardType="numeric"
                            />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddRoupa}>
                        <Text style={styles.addLink}>+ Adicionar roupa</Text>
                    </TouchableOpacity>

                    {medicamentos.map((med, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput
                                style={[styles.inputInfo, { flex: 2 }]}
                                placeholder="Medicamento"
                                placeholderTextColor="#B9B6B6"
                                value={med.nome}
                                onChangeText={value => handleMedicamentoChange(value, idx, 'nome')}
                            />
                            <TextInput
                                style={[styles.inputInfo, { flex: 1 }]}
                                placeholder="Qtd."
                                placeholderTextColor="#B9B6B6"
                                value={med.quantidade}
                                onChangeText={value => handleMedicamentoChange(value, idx, 'quantidade')}
                                keyboardType="numeric"
                            />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddMedicamento}>
                        <Text style={styles.addLink}>+ Adicionar medicamento</Text>
                    </TouchableOpacity>

                    <Botao title="CADASTRAR" onPress={handleSubmit} />
                </ScrollView>
            </View>
        </View>
    );
}