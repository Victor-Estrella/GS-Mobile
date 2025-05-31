import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type DashboardProps = {
    pessoasAtual: number;
    capacidade: number;
    alimentos: number;
    agua: number;
    roupas: number;
    medicamentos: number;
};

const getAlertMessage = (current: number, capacidade: number) => {
    const percent = (current / capacidade) * 100;
    if (percent >= 100) {
        return { message: 'Capacidade máxima atingida!', color: '#d32f2f' };
    }
    if (percent >= 90) {
        return { message: 'Atenção: Capacidade quase no limite!', color: '#f57c00' };
    }
    return null;
};

export default function Dashboard({pessoasAtual, capacidade, alimentos, agua, roupas, medicamentos}: DashboardProps) {
    const alert = getAlertMessage(pessoasAtual, capacidade);

    return (
        <View style={styles.bgDashboard}>
            {/* Logo */}
            <View style={styles.logoRow}>
                <Image source={require('../assets/logo.png')} style={styles.logoImg} resizeMode="contain" />
                <Text style={styles.logoText}>
                    <Text style={styles.logoSafe}>SAFE</Text>
                    <Text style={styles.logoBoard}>BOARD</Text>
                </Text>
            </View>

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
                        <Text style={styles.resourceValue}><Text style={styles.bold}>{alimentos}</Text> <Text style={styles.resourceUnit}>kgs</Text></Text>
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

            {/* Card Pessoas abrigadas */}
            <View style={styles.peopleCard}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{borderWidth: 2, borderColor: '#3BFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Text style={styles.peopleTitle}>Pessoas abrigadas</Text>
                </LinearGradient>            
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{borderWidth: 2, borderColor: '#3BFFFF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatedCircularProgress size={160} width={15} fill={(50 / 100) * 100} tintColor="#8BAA8E" backgroundColor="#E0E0E0" rotation={270} arcSweepAngle={180} lineCap="round" style={{ marginTop: 30 }}>
                        {() => (
                            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{50}</Text>
                        )}
                    </AnimatedCircularProgress>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 170, marginTop: -60, marginLeft: 10, marginBottom: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>0</Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>100</Text>
                    </View>                
                </LinearGradient>
            </View>


            {alert && (
                <Text style={[styles.alert, { color: alert.color }]}>{alert.message}</Text>
            )}

            {/* Mapa ilustrativo */}
            <View style={styles.mapPlaceholder}>
                {/* <Image source={require('../assets/map.png')} style={styles.mapImg} resizeMode="cover" /> */}
            </View>
        </View>
    );
}