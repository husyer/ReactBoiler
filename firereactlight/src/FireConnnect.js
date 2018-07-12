import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyCNXgdiNdbffg-LhipECpDRNg0E7Pa42VM",
    authDomain: "fire-react-34a92.firebaseapp.com",
    databaseURL: "https://fire-react-34a92.firebaseio.com",
    projectId: "fire-react-34a92",
    storageBucket: "fire-react-34a92.appspot.com",
    messagingSenderId: "181376635592"
  };

const fireConnect = firebase.initializeApp(config);

export default fireConnect;

export const provider = new firebase.auth.GoogleAuthProvider();
export const Emailprovider = new firebase.auth.EmailAuthProvider();