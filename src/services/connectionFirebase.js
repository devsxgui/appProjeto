import firebase from 'firebase/compat/app';

//E-mail and password autentication
import 'firebase/compat/auth';

//Working with DataBase created in Firebase
import 'firebase/compat/database'; 


// Firebase app configuration
let firebaseConfig = {
  apiKey: "AIzaSyA68rs14ZBFY1xRyr8IaA92vqAPXiZT3a0",
  authDomain: "bancoloja-66431.firebaseapp.com",
  projectId: "bancoloja-66431",
  storageBucket: "bancoloja-66431.appspot.com",
  messagingSenderId: "752494005158",
  appId: "1:752494005158:web:f7385caeaf26718b5d9d67"
};

//Open and close connection
if (!firebase.apps.length){
    //Initializated firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;