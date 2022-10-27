import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../appProjeto/src/screens/Login/login';
import MenuTabs from "../appProjeto/src/screens/MenuTabs/menutabs";

export default function App (){
  const [user, setUser] = useState(null);
  
  //verifica se existe um usuário logado, se não houver chama a
//tela de login
 if(!user){
  return <Login changeStatus={ (user) => setUser(user) }/>
 }

 return <MenuTabs />
}
