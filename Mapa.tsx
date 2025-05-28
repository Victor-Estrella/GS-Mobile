import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

type Shelter = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    capacity: number;
    occupied: number;
};

const mockShelters: Shelter[] = [
    {
        id: '1',
        name: 'Abrigo Central',
        latitude: -23.55052,
        longitude: -46.633308,
        capacity: 100,
        occupied: 80,
    },
    {
        id: '2',
        name: 'Abrigo Leste',
        latitude: -23.552,
        longitude: -46.635,
        capacity: 50,
        occupied: 50,
    },
    {
        id: '3',
        name: 'Abrigo Sul',
        latitude: -23.553,
        longitude: -46.632,
        capacity: 70,
        occupied: 30,
    },
];

const getStatus = (shelter: Shelter) => {
    if (shelter.occupied >= shelter.capacity) return { status: 'Lotado', color: 'red' };
    if (shelter.occupied / shelter.capacity > 0.8) return { status: 'Quase cheio', color: 'orange' };
    return { status: 'Disponível', color: 'green' };
};

export default function Mapa() {
    const [region, setRegion] = useState({
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    const [shelters, setShelters] = useState<Shelter[] | null>(null);

    useEffect(() => {
        setTimeout(() => setShelters(mockShelters), 1000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.map, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 18, color: '#888' }}>Mapa de abrigos próximos</Text>
                {shelters &&
                    shelters.map((shelter) => {
                        const { status, color } = getStatus(shelter);
                        return (
                            <View key={shelter.id} style={{ marginTop: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8, elevation: 2, minWidth: 200 }}>
                                <Text style={{ fontWeight: 'bold' }}>{shelter.name}</Text>
                                <Text>Status: <Text style={{ color }}>{status}</Text></Text>
                                <Text>Ocupação: {shelter.occupied}/{shelter.capacity}</Text>
                            </View>
                        );
                    })}
            </View>
            {!shelters && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#1976d2" />
                    <Text>Carregando abrigos...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    loading: {
        position: 'absolute',
        top: Dimensions.get('window').height / 2 - 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});