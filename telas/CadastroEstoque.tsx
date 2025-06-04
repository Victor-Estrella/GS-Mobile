import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../components/Botao';
import axios from 'axios';

export default function CadastroEstoque() {
    const [pessoas, setPessoas] = useState('');
    const [alimentos, setAlimentos] = useState([{ nome: '', quantidade: '' }]);
    const [agua, setAgua] = useState('');
    const [roupas, setRoupas] = useState([{ nome: '', quantidade: '' }]);
    const [medicamentos, setMedicamentos] = useState([{ nome: '', quantidade: '' }]);

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
            ToastAndroid.show('Preencha todos os campos corretamente', ToastAndroid.SHORT);
            return;
        }

        // Buscar capacidade do abrigo
        let capacidadeAbrigo = 0;
        try {
            const abrigoId = await AsyncStorage.getItem('abrigoId');
            if (!abrigoId) {
                ToastAndroid.show("ID do abrigo não encontrado. Faça login novamente.", ToastAndroid.SHORT);
                return;
            }
            const resp = await axios.get(`http://192.168.0.24:8080/abrigos/${abrigoId}`);
            capacidadeAbrigo = Number(resp.data.capacidadePessoa) || 0;
        } catch {
            ToastAndroid.show("Erro ao buscar capacidade do abrigo.", ToastAndroid.SHORT);
            return;
        }

        if (parsedPessoas > capacidadeAbrigo) {
            ToastAndroid.show(`O número de pessoas não pode ser maior que a capacidade do abrigo`, ToastAndroid.SHORT);
            return;
        }

        try {
            const abrigoId = await AsyncStorage.getItem('abrigoId');
            if (!abrigoId) {
                ToastAndroid.show("ID do abrigo não encontrado. Faça login novamente.", ToastAndroid.SHORT);
                return;
            }

            const body = {
                alimentos: alimentos.map(a => ({ nome: a.nome, quantidade: parseFloat(a.quantidade) })),
                roupas: roupas.map(r => ({ nome: r.nome, quantidade: parseFloat(r.quantidade) })),
                medicamentos: medicamentos.map(m => ({ nome: m.nome, quantidade: parseFloat(m.quantidade) })),
                litrosAgua: parsedAgua,
                numeroPessoa: parsedPessoas,
                chaveAbrigo: parseInt(abrigoId)
            };

            await axios.post(`http://192.168.0.24:8080/estoques/abrigos/${abrigoId}`, body);

            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT);

            // Limpa o formulário após o cadastro
            setPessoas('');
            setAgua('');
            setAlimentos([{ nome: '', quantidade: '' }]);
            setRoupas([{ nome: '', quantidade: '' }]);
            setMedicamentos([{ nome: '', quantidade: '' }]);
        } catch (error) {
            ToastAndroid.show('Erro ao enviar dados', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.bg}>
            <View style={styles.cardInfo}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerInfo}>
                    <Text style={styles.tituloAutenticacao}>CADASTRAR ESTOQUE</Text>
                </LinearGradient>
                <ScrollView contentContainerStyle={styles.formInfo} style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <TextInput style={styles.inputInfo} placeholder="Pessoas Abrigadas" placeholderTextColor="#B9B6B6" value={pessoas} onChangeText={setPessoas} keyboardType="numeric" />
                    {alimentos.map((alimento, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput style={[styles.inputInfo, { flex: 2 }]} placeholder="Alimento" placeholderTextColor="#B9B6B6" value={alimento.nome}
                                onChangeText={value => handleAlimentoChange(value, idx, 'nome')} />
                            <TextInput style={[styles.inputInfo, { flex: 1 }]} placeholder="Qtd." placeholderTextColor="#B9B6B6" value={alimento.quantidade}
                                onChangeText={value => handleAlimentoChange(value, idx, 'quantidade')} keyboardType="numeric" />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddAlimento}>
                        <Text style={styles.addLink}>+ Adicionar alimento</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.inputInfo} placeholder="Litros disponíveis" placeholderTextColor="#B9B6B6" value={agua} onChangeText={setAgua} keyboardType="numeric" />
                    {roupas.map((roupa, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput style={[styles.inputInfo, { flex: 2 }]} placeholder="Roupa" placeholderTextColor="#B9B6B6" value={roupa.nome}
                                onChangeText={value => handleRoupaChange(value, idx, 'nome')} />
                            <TextInput style={[styles.inputInfo, { flex: 1 }]} placeholder="Qtd." placeholderTextColor="#B9B6B6" value={roupa.quantidade}
                                onChangeText={value => handleRoupaChange(value, idx, 'quantidade')} keyboardType="numeric" />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddRoupa}>
                        <Text style={styles.addLink}>+ Adicionar roupa</Text>
                    </TouchableOpacity>
                    {medicamentos.map((med, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput style={[styles.inputInfo, { flex: 2 }]} placeholder="Medicamento" placeholderTextColor="#B9B6B6" value={med.nome}
                                onChangeText={value => handleMedicamentoChange(value, idx, 'nome')} />
                            <TextInput style={[styles.inputInfo, { flex: 1 }]} placeholder="Qtd." placeholderTextColor="#B9B6B6" value={med.quantidade}
                                onChangeText={value => handleMedicamentoChange(value, idx, 'quantidade')} keyboardType="numeric" />
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