import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

export default function AppForm() {
  const [singleFile, setSingleFile] = useState(null);
  

  const uploadImage = async () => {
    //Verifica se está vazio
    if (singleFile != null) {

      // Se tem imagem, cria o FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);

      // Colocar a URL do server
      let res = await fetch(
        'http://localhost/upload.php',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload feito com sucesso');
      }
    } else {
      // Se não selecionado, vai aparecer esse alerta
      alert('Por favor, selecione uma imagem');
    }
  };
 
  const selectFile = async () => {
    // Abrir o selecionar arquivo para selecionar imagem
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(res));
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Tratando possiveis erros
      if (DocumentPicker.isCancel(err)) {
        // Se upload cancelado
        alert('Upload cancelado');
      } else {
        // Para erro desconhecido
        alert('Botão em teste por enquanto: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Insira o nome do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" />

      <Text style={styles.text}> Insira a marca do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" />

      <Text style={styles.text}> Insira o preço do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" />

      <Button style={styles.button} mode="contained" color="#96BB48" activeOpacity={0.5} onPress={selectFile}>
        Selecione uma imagem
      </Button>
      <Button style={styles.button} mode="contained" color="#96BB48" activeOpacity={0.5} onPress={uploadImage}>
        Upar imagem
      </Button>

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
  button: {
    marginBottom: 20,
  },
});
