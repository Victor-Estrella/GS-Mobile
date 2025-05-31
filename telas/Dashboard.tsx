import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';

type DashboardProps = {
    currentPeople: number;
    capacity: number;
    alimentos: number;
    agua: number;
    roupas: number;
    medicamentos: number;
};

const getAlertMessage = (current: number, capacity: number) => {
    const percent = (current / capacity) * 100;
    if (percent >= 100) {
        return { message: 'Capacidade máxima atingida!', color: '#d32f2f' };
    }
    if (percent >= 90) {
        return { message: 'Atenção: Capacidade quase no limite!', color: '#f57c00' };
    }
    return null;
};

export default function Dashboard({currentPeople, capacity, alimentos, agua, roupas, medicamentos}: DashboardProps) {
    const alert = getAlertMessage(currentPeople, capacity);

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
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{borderWidth: 2, borderColor: '#3BFFFF'}}>
                    <Text style={styles.peopleTitle}>Pessoas abrigadas</Text>
                </LinearGradient>            
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{borderWidth: 2, borderColor: '#3BFFFF'}}>
                    <View style={styles.peopleGauge}>
                        {/* Gauge fake */}
                        <View style={styles.gaugeArc}>
                            <Text style={styles.peopleNumber}>{currentPeople}</Text>
                        </View>
                        <View style={styles.gaugeLabels}>
                            <Text style={styles.gaugeLabel}>0</Text>
                            <Text style={styles.gaugeLabel}>{capacity}</Text>
                        </View>
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