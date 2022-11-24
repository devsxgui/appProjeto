import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Listagem({ data, deleteItem, editItem }){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Produto: {data.nome}</Text>
      <Text style={styles.text}>Marca: {data.marca}</Text>
      <Text style={styles.text}>Preço(R$): {data.preco}</Text>
      <Text style={styles.text}>Imagem: {data.imagem}</Text>

      <View style={styles.item}>
        <TouchableOpacity onPress={()=> deleteItem(data.key)}>
          <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editItem(data)}>
          <Icon name="create" color="blue" size={20}>Editar</Icon>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#96BB48",
    width: 350
  },
  text:{
    color:'black',
    fontSize: 17
  },
  item: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
  }
});