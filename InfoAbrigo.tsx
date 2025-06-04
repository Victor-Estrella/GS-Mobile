import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/estilos';
import EditarEstoque from './telas/EditarEstoque';
import CadastroEstoque from './telas/CadastroEstoque';


const { Navigator, Screen } = createBottomTabNavigator();

export default function Usuario() {

    return (
        <View style={styles.container}>
            <Navigator>
                <Screen name='Cadastrar Estoque' options={{
                    headerShown: false,
                    tabBarIcon: (screenProps: any) =>
                        <FontAwesome name='wpforms' size={screenProps.size} color={screenProps.color} />
                }}>
                    {({ navigation }: { navigation: any }) => (<CadastroEstoque />)}
                </Screen>
                <Screen name='Editar Estoque' options={{
                    headerShown: false,
                    tabBarIcon: (screenProps: any) =>
                        <FontAwesome6 name='person-shelter' size={screenProps.size} color={screenProps.color} />
                }}>
                    {({ navigation }: { navigation: any }) => (<EditarEstoque />)}
                </Screen>
            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}