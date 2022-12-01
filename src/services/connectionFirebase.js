import firebase from 'firebase/compat/app';

//E-mail and password autentication
import 'firebase/compat/auth';

//Working with DataBase created in Firebase
import 'firebase/compat/database'; 


// Firebase app configuration
let firebaseConfig = {

};

//Open and close connection
if (!firebase.apps.length){
    //Initializated firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
