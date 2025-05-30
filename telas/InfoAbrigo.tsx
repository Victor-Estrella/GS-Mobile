import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';

export default function InfoAbrigo() {
    const [pessoas, setPessoas] = useState('');
    const [alimentos, setAlimentos] = useState<string[]>(['']);
    const [agua, setAgua] = useState('');
    const [roupas, setRoupas] = useState<string[]>(['']);
    const [medicamentos, setMedicamentos] = useState<string[]>(['']);

    const handleAddAlimento = () => setAlimentos(prev => [...prev, '']);
    const handleAlimentoChange = (value: string, idx: number) => {
        const novos = [...alimentos];
        novos[idx] = value;
        setAlimentos(novos);
    };

    const handleAddRoupa = () => setRoupas(prev => [...prev, '']);
    const handleRoupaChange = (value: string, idx: number) => {
        const novos = [...roupas];
        novos[idx] = value;
        setRoupas(novos);
    };

    const handleAddMedicamento = () => setMedicamentos(prev => [...prev, '']);
    const handleMedicamentoChange = (value: string, idx: number) => {
        const novos = [...medicamentos];
        novos[idx] = value;
        setMedicamentos(novos);
    };

    const handleSubmit = async () => {
        if (
            !pessoas ||
            alimentos.some(a => !a.trim()) ||
            !agua ||
            roupas.some(r => !r.trim()) ||
            medicamentos.some(m => !m.trim())
        ) {
            alert('Preencha todos os campos');
            return;
        }
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <View style={styles.bg}>
            <View style={styles.cardInfo}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerInfo}>
                    <Text style={styles.tituloAutenticacao}>CADASTRO DE ABRIGO</Text>
                </LinearGradient>
                    <ScrollView contentContainerStyle={styles.formInfo} style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                        <TextInput style={styles.inputInfo} placeholder="Pessoas Abrigadas" placeholderTextColor="#B9B6B6" value={pessoas} onChangeText={setPessoas} keyboardType="numeric"/>
                        
                        
                        {alimentos.map((alimento, idx) => (
                            <TextInput key={idx} style={styles.inputInfo} placeholder="Alimentos" placeholderTextColor="#B9B6B6" value={alimento} onChangeText={value => handleAlimentoChange(value, idx)}/>
                        ))}
                        <TouchableOpacity onPress={handleAddAlimento}>
                            <Text style={styles.addLink}>+ Adicionar alimento</Text>
                        </TouchableOpacity>


                        <TextInput style={styles.inputInfo} placeholder="Litros disponíveis" placeholderTextColor="#B9B6B6" value={agua} onChangeText={setAgua} keyboardType="numeric"/>
                        {roupas.map((roupa, idx) => (
                            <TextInput key={idx} style={styles.inputInfo} placeholder="Roupas" placeholderTextColor="#B9B6B6" value={roupa} onChangeText={value => handleRoupaChange(value, idx)}/>
                        ))}
                        <TouchableOpacity onPress={handleAddRoupa}>
                            <Text style={styles.addLink}>+ Adicionar roupa</Text>
                        </TouchableOpacity>


                        {medicamentos.map((med, idx) => (
                            <TextInput key={idx} style={styles.inputInfo} placeholder="Medicamentos" placeholderTextColor="#B9B6B6" value={med} onChangeText={value => handleMedicamentoChange(value, idx)}/>
                        ))}
                        <TouchableOpacity onPress={handleAddMedicamento}>
                            <Text style={styles.addLink}>+ Adicionar medicamento</Text>
                        </TouchableOpacity>


                        <Pressable style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonTextAutenticacao}>CADASTRAR</Text>
                        </Pressable>
                    </ScrollView>
            </View>
        </View>
    );
}