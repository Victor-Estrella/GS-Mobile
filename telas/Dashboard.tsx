import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AlertaList from './AlertaList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
    const [pessoasAtual, setPessoasAtual] = useState(0);
    const [capacidade, setCapacidade] = useState(0);
    const [alimentos, setAlimentos] = useState(0);
    const [agua, setAgua] = useState(0);
    const [roupas, setRoupas] = useState(0);
    const [medicamentos, setMedicamentos] = useState(0);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const abrigoId = await AsyncStorage.getItem('abrigoId');
                    if (!abrigoId) return;

                    // Busca dados do abrigo (capacidade máxima)
                    const abrigoResp = await axios.get(`https://safehub-gs.onrender.com/abrigos/${abrigoId}`);
                    setCapacidade(abrigoResp.data.capacidadePessoa ?? 0);

                    // Busca dados do estoque
                    const estoqueResp = await axios.get(`https://safehub-gs.onrender.com/estoques/abrigos/${abrigoId}`);
                    const estoque = estoqueResp.data;

                    setPessoasAtual(estoque.numeroPessoa ?? 0);
                    setAgua(estoque.litrosAgua ?? 0);

                    // Soma quantidades de alimentos, roupas e medicamentos
                    setAlimentos(
                        (estoque.alimentos || []).reduce((acc: number, item: any) => acc + (item.quantidade || 0), 0)
                    );
                    setRoupas(
                        (estoque.roupas || []).reduce((acc: number, item: any) => acc + (item.quantidade || 0), 0)
                    );
                    setMedicamentos(
                        (estoque.medicamentos || []).reduce((acc: number, item: any) => acc + (item.quantidade || 0), 0)
                    );
                } catch (e) {
                    // Trate erros se necessário
                }
            };
            fetchData();
        }, [])
    );

    const alert = getMessagemdeAlerta(pessoasAtual, capacidade);
    const recursosAviso = getAvisoRecursos(agua, alimentos, roupas, medicamentos);

    return (
        <ScrollView contentContainerStyle={styles.bgDashboard}>
            {/* Logo */}
            <View style={styles.logoRow}>
                <Image source={require('../assets/logo.png')} style={styles.logoImg} resizeMode="contain" />
                <Text style={styles.logoText}>
                    <Text style={styles.logoSafe}>SAFE</Text>
                    <Text style={styles.logoBoard}>BOARD</Text>
                </Text>
            </View>

            {/* Avisos de recursos */}
            {recursosAviso.length > 0 && (
                <View style={{ marginHorizontal: 16, marginBottom: 8 }}>
                    {recursosAviso.map((aviso, idx) => (
                        <Text key={idx} style={[styles.alert, { color: aviso.color, textAlign: 'center' }]}>
                            {aviso.message}
                        </Text>
                    ))}
                </View>
            )}

            {/* Recursos */}
            <View style={styles.resourcesRow}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.resourceBox}>
                    <Image source={require('../assets/agua.png')} style={styles.resourceIcon} />
                    <View>
                        <Text style={styles.resourceLabel}>Água</Text>
                        <Text style={styles.resourceValue}><Text style={styles.bold}>{agua}</Text> <Text style={styles.resourceUnit}>litros</Text></Text>
                    </View>
                </LinearGradient>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.resourceBox}>
                    <Image source={require('../assets/alimentos.png')} style={styles.resourceIcon} />
                    <View>
                        <Text style={styles.resourceLabel}>Alimentos</Text>
                        <Text style={styles.resourceValue}><Text style={styles.bold}>{alimentos}</Text> <Text style={styles.resourceUnit}>pacotes</Text></Text>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.resourcesRow}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.resourceBox}>
                    <Image source={require('../assets/roupas.png')} style={styles.resourceIcon} />
                    <View>
                        <Text style={styles.resourceLabel}>Roupas</Text>
                        <Text style={styles.resourceValue}><Text style={styles.bold}>{roupas}</Text> <Text style={styles.resourceUnit}>mudas</Text></Text>
                    </View>
                </LinearGradient>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.resourceBox}>
                    <Image source={require('../assets/medicamento.png')} style={styles.resourceIcon} />
                    <View>
                        <Text style={styles.resourceLabel}>Medicamentos</Text>
                        <Text style={styles.resourceValue}><Text style={styles.bold}>{medicamentos}</Text> <Text style={styles.resourceUnit}>caixas</Text></Text>
                    </View>
                </LinearGradient>
            </View>
            
            {alert && (
                <Text style={[styles.alert, { color: alert.color }]}>{alert.message}</Text>
            )}
            
            {/* Card Pessoas abrigadas */}
            <View style={styles.peopleCard}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{borderWidth: 2, borderColor: '#3BFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Text style={styles.peopleTitle}>Pessoas abrigadas</Text>
                </LinearGradient>            
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{borderWidth: 2, borderColor: '#3BFFFF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    {capacidade > 0 && (
                        <AnimatedCircularProgress size={160} width={15} fill={(pessoasAtual / capacidade) * 100} tintColor={getLotacao(pessoasAtual, capacidade)} backgroundColor="#E0E0E0"
                            rotation={270} arcSweepAngle={180} lineCap="round" style={{ marginTop: 30 }}>
                            {() => (
                                <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{pessoasAtual}</Text>
                            )}
                        </AnimatedCircularProgress>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 170, marginTop: -60, marginLeft: 10, marginBottom: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>0</Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>{capacidade}</Text>
                    </View>                
                </LinearGradient>
            </View>

            

            {/* Mapa de alertas */}
            <View style={styles.mapPlaceholder}>
                <AlertaList />
                <View style={styles.legendaOverlay}>
                    <Text style={styles.legendaTitulo}>Legenda</Text>
                    <View style={styles.legendaItens}>
                        <View style={styles.legendaItem}>
                            <View style={[styles.diamante, { backgroundColor: '#fbc02d' }]} />
                            <Text style={styles.legendaTexto}>Potencial</Text>
                        </View>
                        <View style={styles.legendaItem}>
                            <View style={[styles.diamante, { backgroundColor: '#ff9800' }]} />
                            <Text style={styles.legendaTexto}>Perigo</Text>
                        </View>
                        <View style={styles.legendaItem}>
                            <View style={[styles.diamante, { backgroundColor: '#d32f2f' }]} />
                            <Text style={styles.legendaTexto}>Grande Perigo</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

// Função de alerta (mantenha a mesma do seu código)
function getMessagemdeAlerta(current: number, capacidade: number) {
    const percent = (current / capacidade) * 100;
    if (percent >= 100) {
        return { message: 'Capacidade máxima atingida!', color: '#d32f2f' };
    }
    if (percent >= 90) {
        return { message: 'Atenção: Capacidade quase no limite!', color: '#f57c00' };
    }
    return null;
}

function getLotacao(current: number, capacidade: number) {
    if (!capacidade || capacidade === 0) return "#8BAA8E";
    const percent = (current / capacidade) * 100;
    if (percent >= 100) return "#d32f2f";
    if (percent >= 90) return "#f57c00";
    if (percent >= 50) return "#fbc02d";
    return "#8BAA8E";
}

function getAvisoRecursos(agua: number, alimentos: number, roupas: number, medicamentos: number) {
    const avisos: { message: string; color: string }[] = [];

    // Limiares para "perto de acabar"
    const LIMIAR_AGUA = 10; // litros
    const LIMIAR_ALIMENTO = 5; // pacotes
    const LIMIAR_ROUPA = 5; // mudas
    const LIMIAR_MEDICAMENTO = 2; // caixas

    if (agua === 0) avisos.push({ message: "Água esgotada!", color: "#d32f2f" });
    else if (agua <= LIMIAR_AGUA) avisos.push({ message: "Água quase acabando!", color: "#f57c00" });

    if (alimentos === 0) avisos.push({ message: "Alimentos esgotados!", color: "#d32f2f" });
    else if (alimentos <= LIMIAR_ALIMENTO) avisos.push({ message: "Alimentos quase acabando!", color: "#f57c00" });

    if (roupas === 0) avisos.push({ message: "Roupas esgotadas!", color: "#d32f2f" });
    else if (roupas <= LIMIAR_ROUPA) avisos.push({ message: "Roupas quase acabando!", color: "#f57c00" });

    if (medicamentos === 0) avisos.push({ message: "Medicamentos esgotados!", color: "#d32f2f" });
    else if (medicamentos <= LIMIAR_MEDICAMENTO) avisos.push({ message: "Medicamentos quase acabando!", color: "#f57c00" });

    return avisos;
}