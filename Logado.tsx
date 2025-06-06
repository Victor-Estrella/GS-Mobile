import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/estilos';
import Dashboard from './telas/Dashboard';
import InfoAbrigo from './InfoAbrigo';
import Mapa from './telas/Mapa';
import Configuracoes from './telas/Configuracoes';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

const { Navigator, Screen } = createDrawerNavigator();

export default function Logado() {

    return (
        <View style={styles.container}>
            <Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: true,
                drawerType: 'front',
                headerBackground: () => <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />,
                drawerStyle: {
                    backgroundColor: '#ffffff',
                    width: 240,
                },
                drawerPosition: 'left',
            }}>
                <Screen name="Dashboard" options={{ title: 'Dashboard',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="dashboard" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Dashboard {...navProps} />
                    )}

                </Screen>
                <Screen name="Informações do Abrigo" options={{ title: 'Estoque do Abrigo',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="inventory" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <InfoAbrigo {...navProps} />
                    )}

                </Screen>
                <Screen name="Mapa" options={{ title: 'Mapa',
                    drawerIcon: ({ color, size }) => (
                        <Entypo name="map" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Mapa {...navProps} />
                    )}

                </Screen>
                <Screen name="Configurações" options={{ title: 'Configurações',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="cog" size={size} color={color} />
                    )}}>

                    {(navProps: any) => (
                        <Configuracoes {...navProps} />
                    )}

                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}