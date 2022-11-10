import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import firebase from "../../services/connectionFirebase";
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
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const inputRef = useRef(null);
  const [key, setKey] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function dados() {
      await firebase.database().ref('produtos').on('value', (snapshot) => {
        setProdutos([]);
        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            marca: chilItem.val().marca,
            valor: chilItem.val().valor,
            cor: chilItem.val().cor,
          };
          setProdutos(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    dados();
  }, []);

  async function cadastrar() { //criação da função cadastrar
    //função async é quando tu manda uma ação, processa algo e devolve, é assincrono

    //editar dados
    if (nome !== '' & marca !== '' & preco !== '' & imagem !== '' & key !== '') {
      firebase.database().ref('produtos').child(key).update({
        nome: nome, marca: marca, preco: preco, imagem: imagem //vou atualizar isso aqui
      })
      Keyboard.dismiss();
      alert('Produto Editado!');
      limparDados();
      setKey('');
      return;
    } 

    //cadastrar dados
    let produtos = await firebase.database().ref('produtos');
    let chave = produtos.push().key;

    produtos.child(chave).set({
      nome: nome,
      marca: marca,
      preco: preco,
      imagem: imagem
    });

    alert('Produto Cadastrado!');
    limparDados();
   }  

   function limparDados(){
    setNome('');
    setMarca('');
    setPreco('');
    setImagem('');
   }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Insira o nome do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" 
      onChangeText={(texto) => setNome(texto)} 
      value={nome} ref={inputRef} />

      <Text style={styles.text}> Insira a marca do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" 
      onChangeText={(texto) => setMarca(texto)} 
      value={marca} ref={inputRef}/>

      <Text style={styles.text}> Insira o preço do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" 
      onChangeText={(texto) => setPreco(texto)} 
      value={preco} ref={inputRef}/>

      <Text style={styles.text}> Insira o caminho da imagem: </Text>
      <TextInput style={styles.input} clearButtonMode="always" 
      onChangeText={(texto) => setImagem(texto)} 
      value={imagem} ref={inputRef}/>

      <Button icon="" mode="contained" color="#96BB48" onPress={cadastrar}>
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
