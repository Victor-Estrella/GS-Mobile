import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/estilos';
import Abrigo from './telas/CadastroAbrigo';
import Mapa from './telas/Mapa';
import Usuario from './Usuario';


const { Navigator, Screen } = createDrawerNavigator();

export default function Deslogado({ navigation }: any) {

    const SucessoLogin = () => {
        navigation.navigate('Logado');
    };

    return (
        <View style={styles.container}>
            <Navigator screenOptions={{
                headerShown: true,
                drawerType: 'front',
                headerBackground: () => <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />,
                drawerStyle: {
                    backgroundColor: '#ffffff',
                    width: 240,
                },
                drawerPosition: 'left',
            }}>
                <Screen name="Usuario">
                    {(navProps: any) => (
                        <Usuario {...navProps} SucessoLogin={SucessoLogin} />
                    )}
                </Screen>
                <Screen name="Abrigo">
                    {(navProps: any) => (
                        <Abrigo {...navProps} />
                    )}
                </Screen>
                <Screen name="Mapa">
                    {(navProps: any) => (
                        <Mapa {...navProps} />
                    )}
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}