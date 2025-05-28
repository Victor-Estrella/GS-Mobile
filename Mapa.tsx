import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {
const [abrigos, setAbrigos] = useState<any[]>([]);

useEffect(() => {
    const dadosMock = [
        {
            id: '12345',
            nome: 'Abrigo Central',
            latitude: -23.55,
            longitude: -46.63,
            capacidade: 100,
            ocupado: 60
        },
        {
            id: '67890',
            nome: 'Abrigo Norte',
            latitude: -23.54,
            longitude: -46.62,
            capacidade: 80,
            ocupado: 80
        }
    ];
    setAbrigos(dadosMock);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }} initialRegion={{
                latitude: -23.55,
                longitude: -46.63,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }}>
                {abrigos.map((abrigo) => (
                    <Marker key={abrigo.id} coordinate={{ latitude: abrigo.latitude, longitude: abrigo.longitude }} title={abrigo.nome} 
                    description={`Ocupado: ${abrigo.ocupado}/${abrigo.capacidade}`} pinColor={abrigo.ocupado >= abrigo.capacidade ? 'red' : 'green'}
                    />
                ))}
            </MapView>
        </View>
    );
}
