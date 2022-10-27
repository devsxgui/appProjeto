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
import { hydrateRoot } from "react-dom/client";
import { Button } from "react-native-paper";
import firebase from "../../services/connectionFirebase";

const rootElement = document.getElementById("root");

function onPressMenuTabs(){
  const root = hydrateRoot (rootElement, <MenuTabs />);
}

export default function Login({ changeStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("login");

  function handleLogin() {
    if (type === "login") {
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((err) => {
          console.log(err);
          alert("Email ou senha não cadastrados!");
          return;
        });
    } else {
      // Aqui cadastramos o usuario
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao Cadastrar!");
          return;
        });
    }
  }

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
        placeholder="Insira seu email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        placeholder="Insira sua senha"
        style={styles.input}
        value={password}
        secureTextEntry //coloca asterisco ao digitar
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        style={[styles.handleLogin,
        { backgroundColor: type === 'login' ? '#96BB48' : '#96BB48' }]}
        onPress={handleLogin}>

        <Text style={styles.loginText}>
          {type === 'login' ? 'Logar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity color="#96BB48" onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
        <Text style={{ textAlign: 'center' }}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
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
    color: "#fff",
  },
  loginText: {
    color: "#000",
    fontSize: 17,
  },
});
