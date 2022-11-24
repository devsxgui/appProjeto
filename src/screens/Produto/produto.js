import React, { useState, useRef, useEffect } from "react";
import firebase from '../../services/connectionFirebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Listagem from '../Listar/listagem';

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
            preco: chilItem.val().preco,
            imagem: chilItem.val().imagem,
          };
          setProdutos(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    dados();
  }, []);

  async function cadastrar() {
    //editar dados
    if (nome !== '' & marca !== '' & preco !== '' & imagem !== '' & key !== '') {
      firebase.database().ref('produtos').child(key).update({
        nome: nome, marca: marca, preco: preco, imagem: imagem
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

   function handleDelete(key) {
    firebase.database().ref('produtos').child(key).remove()
      .then(() => {
        const findProdutos = produtos.filter(item => item.key !== key)
        setProdutos(findProdutos)
      })
  }

  function handleEdit(data) {
    setKey(data.key),
    setNome(data.nome),
    setMarca(data.marca),
    setPreco(data.preco),
    setImagem(data.imagem)
  }

   function limparDados() {
    setNome(''); 
    setMarca('');
    setPreco(''); 
    setImagem('');
   }

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
      <TextInput style={styles.input} clearButtonMode="always" 
        onChangeText={(texto) => setNome(texto)}
        value={nome}
        ref={inputRef}
     />

      <Text style={styles.text}> Insira a marca do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" 
        onChangeText={(texto) => setMarca(texto)}
        value={marca}
        ref={inputRef}/>

      <Text style={styles.text}> Insira o preço do produto: </Text>
      <TextInput style={styles.input} clearButtonMode="always" 
        onChangeText={(texto) => setPreco(texto)}
        value={preco}
        ref={inputRef}/>

      <Text style={styles.text}> Insira o caminho da imagem: </Text>
      <TextInput style={styles.input} clearButtonMode="always"
        onChangeText={(texto) => setImagem(texto)}
        value={imagem}
        ref={inputRef} />

      <Button icon="" mode="contained" color="#96BB48" onPress={cadastrar}>
          Cadastrar
      </Button>

      <View>
        <Text style={styles.listar}>Listagem de Produtos</Text>
      </View>

      {loading ?
        (
          <ActivityIndicator color="#121212" size={45} />
        ) :
        (
          <FlatList
            keyExtractor={item => item.key}
            data={produtos}
            renderItem={({ item }) => (
              <Listagem data={item} deleteItem={handleDelete}
                editItem={handleEdit} />
            )}
          />
        )
      }
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
    width: 360
  },
  listar: {
    marginTop: 20,
    marginBottom: 5
  },
});