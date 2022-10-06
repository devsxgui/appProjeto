//useState é pra pegar a coisa que tá digitando e setar em algum lugar
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Logo from "../../images/logo.png";
import MenuTabs from "../MenuTabs/menutabs";
import {hydrateRoot} from 'react-dom/client';
import { Button } from 'react-native-paper';

const rootElement = document.getElementById('root');

function onPressMenuTabs() {
  const root = hydrateRoot(rootElement, <MenuTabs/>);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Logo}
        style={{
          margemtop: 10,
          width: "auto",
          height: 350,
          alignItems: "center",
        }}
      />
      <TextInput
        placeholder="Seu email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        placeholder="*********"
        style={styles.input}
        value={password}
        secureTextEntry //coloca asterisco ao digitar
        onChangeText={(text) => setPassword(text)}
      />

        <Button icon="" mode="contained" onPress={onPressMenuTabs} color="#96BB48">
          Logar
        </Button>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 150,
    backgroundColor: "#E2F0C4",
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 4,
    height: 45,
    width: 320,
    paddingLeft: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: "#96BB48",
    textAlign: "center",
  },

  handleLogin: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: "#96BB48",
    fontSize: 17,
  },
});
