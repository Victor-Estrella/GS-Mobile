import React, { useState } from 'react';
import { FontAwesome, FontAwesome6} from '@expo/vector-icons';
import { styles } from './estilos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Cadastro } from './Cadastro';
import { Login } from './Login';


const {Navigator, Screen} = createBottomTabNavigator();

export default function Usuario({ SucessoLogin }: { SucessoLogin: () => void }) {
    const [cadastro, setCadastro] = useState<any[]>([]);

    const logar = (nome : string, senha: string) => { 
            SucessoLogin();
    }


    const cadastrar = (nome : string, email:string, senha: string) => {
        const obj = {nome, email, senha};
        setCadastro([...cadastro, obj])
    }


    return (
        <View style={styles.container}>
            <Navigator>
                <Screen name='Cadastro' options={{
                    headerShown: false,
                    tabBarIcon: (screenProps: any) =>
                        <FontAwesome name='wpforms' size={screenProps.size} color={screenProps.color}/>
                    }}>
                    {({ navigation }: { navigation: any }) => ( <Cadastro onCadastro={cadastrar} navigation={navigation} />)}
                </Screen>
                <Screen name='Login' options={{
                    headerShown: false,
                    tabBarIcon: (screenProps: any) => 
                        <FontAwesome6 name='person-shelter' size={screenProps.size} color={screenProps.color}/>
                    }}>
                    {({navigation}:{navigation:any}) => ( <Login onLogin={logar} navigation={navigation} />)}
                </Screen> 
            </Navigator>
            <StatusBar style="auto" />
        </View>
    );
}