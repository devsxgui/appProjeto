import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
    return (
        <View style={styles.container}>
            <form>
                <label>
                    Nome do Usuário:
                    <input style={styles.input} type="text" name="nomeusuario" />
                </label>
                <br/>
                <label>
                    E-mail:
                    <input style={styles.input}  type="text" name="email" />
                </label>
                <br/>
                <label>
                    Senha:
                    <input style={styles.input}  type="text" name="senha" />
                </label>
                <br/>
                <input type="submit" value="Enviar" />
            </form>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
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
        borderColor: '#141414',
        borderRadius: 20,
    }
})