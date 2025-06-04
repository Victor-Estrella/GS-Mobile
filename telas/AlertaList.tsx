// AlertaMapa.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { XMLParser } from 'fast-xml-parser';
import { styles } from '../styles/estilos';

// Exemplo de mapeamento de regiões para coordenadas (adicione mais conforme necessário)
const regioesCoords: Record<string, { latitude: number; longitude: number }> = {
  "Metropolitana de Porto Alegre": { latitude: -30.0346, longitude: -51.2177 },
  "Sul Catarinense": { latitude: -28.735, longitude: -49.429 },
  "Nordeste Rio-grandense": { latitude: -28.5, longitude: -51.5 },
  // ...adicione outras regiões importantes
};

function getAlertaColor(title: string) {
  if (/vermelho|grande perigo/i.test(title)) return "#d32f2f";
  if (/laranja|perigo\b/i.test(title)) return "#ff9800";
  if (/amarelo|potencial/i.test(title)) return "#fbc02d";
  return "#1976d2";
}

function extrairAreas(description: string): string[] {
  const match = description.match(/<th[^>]*>Área<\/th><td>(.*?)<\/td>/i);
  if (!match) return [];
  // Divide por vírgula e remove "Aviso para as Áreas:" se existir
  return match[1]
    .replace(/^Aviso para as Áreas:\s*/i, "")
    .split(',')
    .map(area => area.trim());
}

export default function AlertaMapa() {
  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const res = await fetch('https://apiprevmet3.inmet.gov.br/avisos/rss');
        const text = await res.text();
        const parser = new XMLParser({ ignoreAttributes: false });
        const result = parser.parse(text);
        const items = result?.rss?.channel?.item || [];
        setAlertas(Array.isArray(items) ? items : [items]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchAlertas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E88E5" />
        <Text style={{ color: '#1E88E5', marginTop: 10 }}>Carregando alertas...</Text>
      </View>
    );
  }

  // Gera marcadores para cada área conhecida dos alertas
  const markers = [];
  for (const alerta of alertas) {
    const title = alerta.title || "";
    const desc = alerta.description || "";
    const color = getAlertaColor(title);
    const areas = extrairAreas(desc);
    for (const area of areas) {
      if (regioesCoords[area]) {
        markers.push({
          key: `${alerta.guid || title}-${area}`,
          title,
          area,
          color,
          coords: regioesCoords[area],
        });
      }
    }
  }

  // Função para centralizar o mapa no marcador selecionado, ajustando para o MapView pequeno
  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker.key);

    // Ajuste: desloca latitude para cima (ex: 1 grau, ajuste conforme seu MapView)
    const LAT_OFFSET = -0.8; // ajuste esse valor conforme necessário

    mapRef.current?.animateToRegion(
      {
        latitude: marker.coords.latitude + LAT_OFFSET,
        longitude: marker.coords.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      },
      500
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        initialRegion={{
          latitude: -15.78,
          longitude: -47.93,
          latitudeDelta: 25,
          longitudeDelta: 25,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coords}
            pinColor={marker.color}
            title={marker.title}
            description={marker.area}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
    </View>
  );
}