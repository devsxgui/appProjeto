import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ListagemPerfil({ data, deleteItem, editItem }){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Apelido: {data.apelidoPerfil}</Text>
      <Text style={styles.text}>Celular: {data.celularPerfil}</Text>
      <Text style={styles.text}>Cidade: {data.cidadePerfil}</Text>
      <Text style={styles.text}>Endereço: {data.enderecoPerfil}</Text>
      <Text style={styles.text}>Nome Completo: {data.nomeCompleto}</Text>
      <Text style={styles.text}>Numero Perfil: {data.numeroPerfil}</Text>

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