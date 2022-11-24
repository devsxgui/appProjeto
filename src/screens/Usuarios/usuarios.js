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
import ListagemPerfil from '../Listar/listargem_users';

export default function AppForm() {
    const [apelidoPerfil, setapelidoPerfil] = useState('');
    const [celularPerfil, setcelularPerfil] = useState('');
    const [cidadePerfil, setcidadePerfil] = useState('');
    const [enderecoPerfil, setenderecoPerfil] = useState('');
    const [nomeCompleto, setnomeCompleto] = useState('');
    const [numeroPerfil, setnumeroPerfil] = useState('');
    const inputRef = useRef(null);
    const [key, setKey] = useState('');
    const [perfil, setPerfil] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function dados() {

            firebase.database().ref('perfil').on('value', (snapshot) => {
                setPerfil([]);

                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        apelidoPerfil: chilItem.val().apelidoPerfil,
                        celularPerfil: chilItem.val().celularPerfil,
                        cidadePerfil: chilItem.val().cidadePerfil,
                        enderecoPerfil: chilItem.val().enderecoPerfil,
                        nomeCompleto: chilItem.val().nomeCompleto,
                        numeroPerfil: chilItem.val().numeroPerfil,
                    };
                    setPerfil(oldArray => [...oldArray, data].reverse());
                });
                setLoading(false);
            })
        }
        dados();
    }, []);

    async function cadastrar() {
        //editar dados
        if (apelidoPerfil !== ''
        & celularPerfil !== ''
        & cidadePerfil !== ''
        & enderecoPerfil !== ''
        & nomeCompleto !== ''
        & numeroPerfil !== ''
        & key !== '') {
            firebase.database().ref('perfil').child(key).update({
                apelidoPerfil: apelidoPerfil,
                celularPerfil: celularPerfil,
                cidadePerfil: cidadePerfil,
                enderecoPerfil: enderecoPerfil,
                nomeCompleto: nomeCompleto,
                numeroPerfil: numeroPerfil
            })
            Keyboard.dismiss();
            alert('Perfil Editado!');
            limparDados();
            setKey('');
            return;
        }
        //cadastrar dados
        let perfil = firebase.database().ref('perfil');
        let chave = perfil.push().key;

        perfil.child(chave).set({
            apelidoPerfil: apelidoPerfil,
            celularPerfil: celularPerfil,
            cidadePerfil: cidadePerfil,
            enderecoPerfil: enderecoPerfil,
            nomeCompleto: nomeCompleto,
            numeroPerfil: numeroPerfil
        });
        alert('Perfil Cadastrado!');
        limparDados();
    }

    function handleDelete(key) {
        firebase.database().ref('perfil').child(key).remove()
            .then(() => {
                const findPerfil = perfil.filter(item => item.key !== key)
                setPerfil(findPerfil)
            })
    }

    function handleEdit(data) {
        setKey(data.key),
            setapelidoPerfil(data.apelidoPerfil),
            setcelularPerfil(data.celularPerfil),
            setcidadePerfil(data.cidadePerfil),
            setenderecoPerfil(data.enderecoPerfil),
            setnomeCompleto(data.nomeCompleto),
            setnumeroPerfil(data.numeroPerfil)
    }

    function limparDados() {
        setapelidoPerfil('');
        setcelularPerfil('');
        setcidadePerfil('');
        setenderecoPerfil('');
        setnomeCompleto('');
        setnumeroPerfil('');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}> Insira o apelido: </Text>
            <TextInput style={styles.input} clearButtonMode="always"
                onChangeText={(texto) => setapelidoPerfil(texto)}
                value={apelidoPerfil}
                ref={inputRef} />

            <Text style={styles.text}> Insira o celular: </Text>
            <TextInput style={styles.input} clearButtonMode="always"
                onChangeText={(texto) => setcelularPerfil(texto)}
                value={celularPerfil}
                ref={inputRef} />

            <Text style={styles.text}> Insira a cidade: </Text>
            <TextInput style={styles.input} clearButtonMode="always"
                onChangeText={(texto) => setcidadePerfil(texto)}
                value={cidadePerfil}
                ref={inputRef} />

            <Text style={styles.text}> Insira o endereço: </Text>
            <TextInput style={styles.input} clearButtonMode="always"
                onChangeText={(texto) => setenderecoPerfil(texto)}
                value={enderecoPerfil}
                ref={inputRef} />

            <Text style={styles.text}> Insira o nome completo: </Text>
            <TextInput style={styles.input} clearButtonMode="always"
                onChangeText={(texto) => setnomeCompleto(texto)}
                value={nomeCompleto}
                ref={inputRef} />

            <Text style={styles.text}> Insira o numero: </Text>
            <TextInput style={styles.input} clearButtonMode="always"
                onChangeText={(texto) => setnumeroPerfil(texto)}
                value={numeroPerfil}
                ref={inputRef} />

            <Button icon="" mode="contained" color="#96BB48" onPress={cadastrar}>
                Cadastrar
            </Button>

            <View>
                <Text style={styles.listar}>Listagem de Perfil</Text>
            </View>

            {loading ?
                (
                    <ActivityIndicator color="#121212" size={45} />
                ) :
                (
                    <FlatList
                        keyExtractor={item => item.key}
                        data={perfil}
                        renderItem={({ item }) => (
                            <ListagemPerfil data={item} deleteItem={handleDelete}
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