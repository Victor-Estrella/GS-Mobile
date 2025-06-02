import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles/estilos';
import { Cadastro } from './telas/Cadastro';
import { Login } from './telas/Login';
import ListaCadastro from './types/CadastroTipo';


const { Navigator, Screen } = createBottomTabNavigator();

export default function Usuario() {
    const [cadastro, setCadastro] = useState<ListaCadastro[]>([]);

    return (
        <View style={styles.container}>
            <Navigator>
                <Screen name='Cadastro' options={{
                    headerShown: false,
                    tabBarIcon: (screenProps: any) =>
                        <FontAwesome name='wpforms' size={screenProps.size} color={screenProps.color} />
                }}>
                    {({ navigation }: { navigation: any }) => (<Cadastro navigation={navigation} />)}
                </Screen>
                <Screen name='Login' options={{
                    headerShown: false,
                    tabBarIcon: (screenProps: any) =>
                        <FontAwesome6 name='person-shelter' size={screenProps.size} color={screenProps.color} />
                }}>
                    {({ navigation }: { navigation: any }) => (<Login navigation={navigation} />)}
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}