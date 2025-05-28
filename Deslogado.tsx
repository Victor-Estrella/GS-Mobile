import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './estilos';
import Usuario from './Usuario';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Abrigo from './CadastroAbrigo';
import Mapa from './Mapa';


const {Navigator, Screen} = createDrawerNavigator();

export default function Deslogado({ navigation }: any) {

    const SucessoLogin = () => {
        navigation.navigate('Logado');
    };

    return (
        <View style={styles.container}>
            <Navigator screenOptions={{
                headerShown: true,
                drawerType: 'front',
                headerBackground: () => <View style={{ flex: 1, backgroundColor: '#6b6b6b' }} />,
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
                        <Abrigo {...navProps}/>
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