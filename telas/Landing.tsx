import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/estilos';
import BotaoProps from '../types/BotaoTipo';

export default function Landing({ navigation }: any) {
    return (
        <View style={styles.containerLanding}>
            {/* Topo com logo e texto */}
            <View style={styles.headerLanding}>
                <View style={styles.logoRowLanding}>
                    <Image source={require('../assets/escudo.png')} style={styles.logoIcon} />
                    <Text style={styles.logoTextLanding}>SafeHub</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={require('../assets/mobile.png')} style={styles.mobileImg} />
                    <Text style={styles.infoText}>
                        Nosso app conecta você a abrigos em tempo real: veja a lotação, o estoque de suprimentos, alertas climáticos e rotas seguras.{"\n"}
                        Tudo em um só lugar, com dados confiáveis para agir rápido em momentos de emergência.{"\n\n"}
                        Simples, útil e feito para proteger.
                    </Text>
                </View>
            </View>

            {/* Card de cadastro */}
            <LinearGradient colors={["#1E88E5", "#1E86E2", "#114B7F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardLanding}>
                <Text style={styles.cardTitle}>Cadastre-se agora e fique sempre um passo à frente do risco!</Text>
                <Image source={require('../assets/homeless.png')} style={styles.cardImg} />
                <TouchableOpacity style={styles.buttonLanding}  onPress={() => navigation.navigate('Usuario')}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}
