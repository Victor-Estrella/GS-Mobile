import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../components/Botao';
import axios from 'axios';

export default function EditarEstoque() {
    const [pessoas, setPessoas] = useState('');
    const [alimentos, setAlimentos] = useState([{ nome: '', quantidade: '' }]);
    const [agua, setAgua] = useState('');
    const [roupas, setRoupas] = useState([{ nome: '', quantidade: '' }]);
    const [medicamentos, setMedicamentos] = useState([{ nome: '', quantidade: '' }]);

    useEffect(() => {
        const fetchEstoque = async () => {
            try {
                const abrigoId = await AsyncStorage.getItem('abrigoId');
                if (!abrigoId) return;
                const response = await axios.get(`http://192.168.0.24:8080/estoques/abrigos/${abrigoId}`);
                const estoque = response.data;
                if (estoque) {
                    setPessoas(estoque.numeroPessoa?.toString() || '');
                    setAgua(estoque.litrosAgua?.toString() || '');
                    setAlimentos(estoque.alimentos?.map((a: any) => ({ nome: a.nome, quantidade: a.quantidade.toString() })) || [{ nome: '', quantidade: '' }]);
                    setRoupas(estoque.roupas?.map((r: any) => ({ nome: r.nome, quantidade: r.quantidade.toString() })) || [{ nome: '', quantidade: '' }]);
                    setMedicamentos(estoque.medicamentos?.map((m: any) => ({ nome: m.nome, quantidade: m.quantidade.toString() })) || [{ nome: '', quantidade: '' }]);
                }
            } catch (e) {
                // Não mostra erro ao abrir, só não preenche
            }
        };
        fetchEstoque();
    }, []);

    const addAlimento = () => setAlimentos(prev => [...prev, { nome: '', quantidade: '' }]);
    const alimentoChange = (value: string, idx: number, field: 'nome' | 'quantidade') => {
        const novos = [...alimentos];
        novos[idx][field] = value;
        setAlimentos(novos);
    };
    const addRoupa = () => setRoupas(prev => [...prev, { nome: '', quantidade: '' }]);
    const roupaChange = (value: string, idx: number, field: 'nome' | 'quantidade') => {
        const novos = [...roupas];
        novos[idx][field] = value;
        setRoupas(novos);
    };
    const addMedicamento = () => setMedicamentos(prev => [...prev, { nome: '', quantidade: '' }]);
    const medicamentoChange = (value: string, idx: number, field: 'nome' | 'quantidade') => {
        const novos = [...medicamentos];
        novos[idx][field] = value;
        setMedicamentos(novos);
    };

    const alterar = async () => {
        const parsedPessoas = parseInt(pessoas);
        const parsedAgua = parseFloat(agua);

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

            await axios.patch(`http://192.168.0.24:8080/estoques/abrigos/${abrigoId}`, body);

            ToastAndroid.show('Estoque atualizado com sucesso!', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show('Erro ao atualizar dados', ToastAndroid.SHORT);
        }
    };

    // Função para excluir o estoque
    const deletar = async () => {
        Alert.alert(
            "Excluir Estoque",
            "Tem certeza que deseja excluir todo o estoque deste abrigo?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const abrigoId = await AsyncStorage.getItem('abrigoId');
                            if (!abrigoId) {
                                ToastAndroid.show("ID do abrigo não encontrado.", ToastAndroid.SHORT);
                                return;
                            }
                            await axios.delete(`http://192.168.0.24:8080/estoques/abrigo/${abrigoId}`);
                            ToastAndroid.show('Estoque excluído com sucesso!', ToastAndroid.SHORT);
                            // Limpa os campos após exclusão
                            setPessoas('');
                            setAgua('');
                            setAlimentos([{ nome: '', quantidade: '' }]);
                            setRoupas([{ nome: '', quantidade: '' }]);
                            setMedicamentos([{ nome: '', quantidade: '' }]);
                        } catch (error) {
                            ToastAndroid.show('Erro ao excluir estoque', ToastAndroid.SHORT);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.bg}>
            <View style={styles.cardInfo}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerInfo}>
                    <Text style={styles.tituloAutenticacao}>EDITAR ESTOQUE</Text>
                </LinearGradient>
                <ScrollView contentContainerStyle={styles.formInfo} style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <TextInput style={styles.inputInfo} placeholder="Pessoas Abrigadas" placeholderTextColor="#B9B6B6" value={pessoas} onChangeText={setPessoas} keyboardType="numeric" />
                    {alimentos.map((alimento, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput style={[styles.inputInfo, { flex: 2 }]} placeholder="Alimento" placeholderTextColor="#B9B6B6" value={alimento.nome}
                                onChangeText={value => alimentoChange(value, idx, 'nome')} />
                            <TextInput style={[styles.inputInfo, { flex: 1 }]} placeholder="Qtd." placeholderTextColor="#B9B6B6" value={alimento.quantidade}
                                onChangeText={value => alimentoChange(value, idx, 'quantidade')} keyboardType="numeric" />
                        </View>
                    ))}
                    <TouchableOpacity onPress={addAlimento}>
                        <Text style={styles.addLink}>+ Adicionar alimento</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.inputInfo} placeholder="Litros disponíveis" placeholderTextColor="#B9B6B6" value={agua} onChangeText={setAgua} keyboardType="numeric" />
                    {roupas.map((roupa, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput style={[styles.inputInfo, { flex: 2 }]} placeholder="Roupa" placeholderTextColor="#B9B6B6" value={roupa.nome}
                                onChangeText={value => roupaChange(value, idx, 'nome')} />
                            <TextInput style={[styles.inputInfo, { flex: 1 }]} placeholder="Qtd." placeholderTextColor="#B9B6B6" value={roupa.quantidade}
                                onChangeText={value => roupaChange(value, idx, 'quantidade')} keyboardType="numeric" />
                        </View>
                    ))}
                    <TouchableOpacity onPress={addRoupa}>
                        <Text style={styles.addLink}>+ Adicionar roupa</Text>
                    </TouchableOpacity>
                    {medicamentos.map((med, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8 }}>
                            <TextInput style={[styles.inputInfo, { flex: 2 }]} placeholder="Medicamento" placeholderTextColor="#B9B6B6" value={med.nome}
                                onChangeText={value => medicamentoChange(value, idx, 'nome')} />
                            <TextInput style={[styles.inputInfo, { flex: 1 }]} placeholder="Qtd." placeholderTextColor="#B9B6B6" value={med.quantidade}
                                onChangeText={value => medicamentoChange(value, idx, 'quantidade')} keyboardType="numeric" />
                        </View>
                    ))}
                    <TouchableOpacity onPress={addMedicamento}>
                        <Text style={styles.addLink}>+ Adicionar medicamento</Text>
                    </TouchableOpacity>
                    <Botao title="SALVAR ALTERAÇÕES" onPress={alterar} />
                    <Botao title="EXCLUIR ESTOQUE" onPress={deletar} cor="red" />
                    
                </ScrollView>
            </View>
        </View>
    );
}