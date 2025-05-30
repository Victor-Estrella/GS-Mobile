import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function Dashboard({
    currentPeople,
    capacity,
    alimentos,
    agua,
    roupas,
    medicamentos,
}: DashboardProps) {
    const alert = getAlertMessage(currentPeople, capacity);

    return (
        <View style={styles.bg}>
            <View style={styles.logoRow}>
                <Text style={styles.logoIcon}>📊</Text>
                <Text style={styles.logoText}>
                    <Text style={styles.logoSafe}>SAFE</Text>
                    <Text style={styles.logoBoard}>BOARD</Text>
                </Text>
            </View>

            <View style={styles.resourcesRow}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} style={styles.resourceBox}>
                    <Text style={styles.resourceLabel}>Água</Text>
                    <Text style={styles.resourceValue}>{agua} <Text style={styles.resourceUnit}>12 litros</Text></Text>
                </LinearGradient>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} style={styles.resourceBox}>
                    <Text style={styles.resourceLabel}>Alimentos</Text>
                    <Text style={styles.resourceValue}>{alimentos} <Text style={styles.resourceUnit}>kgs</Text></Text>
                </LinearGradient>
            </View>
            <View style={styles.resourcesRow}>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} style={styles.resourceBox}>
                    <Text style={styles.resourceLabel}>Roupas</Text>
                    <Text style={styles.resourceValue}>{roupas} <Text style={styles.resourceUnit}>mudas</Text></Text>
                </LinearGradient>
                <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} style={styles.resourceBox}>
                    <Text style={styles.resourceLabel}>Medicamentos</Text>
                    <Text style={styles.resourceValue}>{medicamentos} <Text style={styles.resourceUnit}>caixas</Text></Text>
                </LinearGradient>
            </View>

            <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} style={styles.peopleCard}>
                <Text style={styles.peopleTitle}>Pessoas abrigadas</Text>
                <View style={styles.peopleGauge}>
                    <View style={styles.gaugeArc}>
                        {/* Aqui você pode adicionar um componente de gauge real, se quiser */}
                        <Text style={styles.peopleNumber}>{currentPeople}</Text>
                    </View>
                    <View style={styles.gaugeLabels}>
                        <Text style={styles.gaugeLabel}>0</Text>
                        <Text style={styles.gaugeLabel}>{capacity}</Text>
                    </View>
                </View>
            </LinearGradient>

            {alert && (
                <Text style={[styles.alert, { color: alert.color }]}>{alert.message}</Text>
            )}

            {/* <View style={styles.mapPlaceholder}>
                <Text style={{ color: "#888", textAlign: "center" }}>Mapa aqui</Text>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "#81C784",
        alignItems: "center",
        paddingTop: 32,
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        marginTop: 10,
    },
    logoIcon: {
        fontSize: 32,
        marginRight: 8,
    },
    logoText: {
        fontSize: 32,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    logoSafe: {
        color: "#fff",
        fontWeight: "900",
    },
    logoBoard: {
        color: "#1E88E5",
        fontWeight: "900",
    },
    resourcesRow: {
        flexDirection: "row",
        justifyContent: "center",
        width: "90%",
        marginBottom: 10,
        gap: 16,
    },
    resourceBox: {
        flex: 1,
        backgroundColor: "#1E88E5",
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginHorizontal: 4,
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: 140,
        elevation: 2,
    },
    resourceLabel: {
        color: "#dbeafe",
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 2,
    },
    resourceValue: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    resourceUnit: {
        color: "#dbeafe",
        fontSize: 14,
        fontWeight: "400",
    },
    peopleCard: {
        width: "90%",
        borderRadius: 20,
        marginTop: 18,
        marginBottom: 18,
        padding: 0,
        overflow: "hidden",
        elevation: 2,
    },
    peopleTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        padding: 16,
        paddingBottom: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "transparent",
    },
    peopleGauge: {
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    gaugeArc: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    peopleNumber: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    },
    gaugeLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 4,
    },
    gaugeLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        opacity: 0.8,
    },
    alert: {
        fontWeight: 'bold',
        marginTop: 12,
        textAlign: 'center',
        fontSize: 16,
    },
    // Opcional: placeholder para o mapa
    mapPlaceholder: {
        width: "90%",
        aspectRatio: 1,
        backgroundColor: "#c8e6c9",
        borderRadius: 24,
        marginTop: 16,
        alignItems: "center",
        justifyContent: "center",
    },
});