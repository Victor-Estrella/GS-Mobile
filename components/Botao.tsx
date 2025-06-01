import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/estilos";
import BotaoProps from "../types/BotaoTipo";

export default function Botao(props: BotaoProps & { cor?: string }) {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ width: "100%" }}>
            <View style={[styles.button, props.cor === "red" && { backgroundColor: "#d32f2f" }]}>
                <Text style={styles.buttonTextAutenticacao}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
