import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button } from 'react-native-paper';

export default function AppForm() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Insira o nome do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" />

      <Text style={styles.text}> Insira a marca do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" />

      <Text style={styles.text}> Insira o preço do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" />
      <Button icon="" mode="contained" color="#96BB48">
          Cadastrar
        </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2F0C4",
  },

  text: {
    fontSize: 15,
  },

  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    backgroundColor: "#FFF",
    borderColor: "#96BB48",
    textAlign: "center",
  },
});
