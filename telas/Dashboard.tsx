import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard de Abrigo</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pessoas</Text>
                <Text style={styles.people}>
                    Pessoas abrigadas: <Text style={styles.strong}>{currentPeople}</Text> / {capacity}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recursos</Text>
                <Text style={styles.resource}>
                    Alimentos: <Text style={styles.strong}>{alimentos}</Text>
                </Text>
                <Text style={styles.resource}>
                    Água: <Text style={styles.strong}>{agua}</Text>
                </Text>
                <Text style={styles.resource}>
                    Roupas: <Text style={styles.strong}>{roupas}</Text>
                </Text>
                <Text style={styles.resource}>
                    Medicamentos: <Text style={styles.strong}>{medicamentos}</Text>
                </Text>
            </View>

            {alert && (
                <Text style={[styles.alert, { color: alert.color }]}>{alert.message}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 400,
        alignSelf: 'center',
        marginTop: 32,
        padding: 24,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    people: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
    },
    resources: {
        marginBottom: 16,
    },
    resource: {
        fontSize: 18,
        marginBottom: 4,
        textAlign: 'center',
    },
    strong: {
        fontWeight: 'bold',
    },
    alert: {
        fontWeight: 'bold',
        marginTop: 12,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
    },
});