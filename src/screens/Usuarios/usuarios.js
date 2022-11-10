import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
    return (
        <View style={styles.container}>
            <form>
                <label style={styles.label}>
                    Nome do Usuário:
                    <input style={styles.input} type="text" name="nomeusuario" />
                </label>
                <br/>
                <label style={styles.label}>
                    E-mail:
                    <input style={styles.input}  type="text" name="email" />
                </label>
                <br/>
                <label style={styles.label}>
                    Senha:
                    <input style={styles.input}  type="text" name="senha" />
                </label >
                <br/>
                <input type="submit" value="Enviar" style={styles.button} />
            </form>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E2F0C4"
    },

    input:{
        marginBottom: 10,
        marginLeft: 0,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        height: 60,
        width:320,
        padding: 10,
        borderWidth: 1,
        alignItems:'center',
        borderColor: '#96BB48',
    },

    label: {
        fontSize: 20,
    },

    button: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 100,
        marginBottom: 20,
        backgroundColor: "#96BB48",
        borderRadius: 10,
    }
})