import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

// Função de geocodificação usando Nominatim
const geocodeAddress = async (endereco: string) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: endereco,
                format: 'json',
            },
            headers: {
                'User-Agent': 'SmartAbrigoApp/1.0 (contato@exemplo.com)',
                'Accept-Language': 'pt-BR',
            }
        });

        if (response.data.length > 0) {
            return {
                latitude: parseFloat(response.data[0].lat),
                longitude: parseFloat(response.data[0].lon),
            };
        } else {
            throw new Error("Endereço não encontrado");
        }
    } catch (error) {
        console.error('Erro no geocode:', error);
        throw error;
    }
};

// Função para cor do marcador conforme ocupação
function getPinColor(ocupacao: number, capacidade: number) {
    const percent = ocupacao / capacidade;
    if (percent >= 0.8) return "red";
    if (percent >= 0.5) return "yellow";
    return "green";  
}

export default function Mapa() {
    const [abrigos, setAbrigos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [pinSelecionado, setPinSelecionado] = useState<string | null>(null);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        const buscarAbrigos = async () => {
            try {
                // Busca todos os abrigos do backend
                const response = await axios.get('http://192.168.0.24:8080/abrigos');
                const abrigosApi = response.data;

                // Para cada abrigo, busca latitude/longitude pelo endereço
                const abrigosComGeo = await Promise.all(
                    abrigosApi.map(async (abrigo: any) => {
                        try {
                            const coords = await geocodeAddress(abrigo.localizacao);
                            const ocupacao = 120;
                            return {
                                ...abrigo,
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                                ocupacao,
                            };
                        } catch {
                            // Se não conseguir geocodificar, ignora o abrigo
                            return null;
                        }
                    })
                );

                // Remove abrigos que não conseguiram geocodificação
                setAbrigos(abrigosComGeo.filter(Boolean));
            } catch (error) {
                setAbrigos([]);
            } finally {
                setCarregando(false);
            }
        };

        buscarAbrigos();
    }, []);

    // Função para centralizar e dar zoom no marcador selecionado
    const centralizarNoMapa = (abrigo: any) => {
        setPinSelecionado(abrigo.idCadastroAbrigo || abrigo.id);
        mapRef.current?.animateToRegion(
            {
                latitude: abrigo.latitude,
                longitude: abrigo.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            500
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView ref={mapRef} style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                initialRegion={{ latitude: -23.55, longitude: -46.63, latitudeDelta: 0.02, longitudeDelta: 0.02 }}>
                
                {abrigos.map((abrigo) => (
                    <Marker key={abrigo.idCadastroAbrigo || abrigo.id} coordinate={{ latitude: abrigo.latitude, longitude: abrigo.longitude }} title={abrigo.nomeAbrigo} 
                    description={`Ocupação: ${abrigo.ocupacao}/${abrigo.capacidadePessoa}`} pinColor={getPinColor(abrigo.ocupacao, abrigo.capacidadePessoa)} 
                    onPress={() => centralizarNoMapa(abrigo)}/>
                ))}

            </MapView>
        </View>
    );
}
