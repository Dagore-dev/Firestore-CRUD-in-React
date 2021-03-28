import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDmKR6NvKXba0u87IKY8PhEFoqMuQOBLdM",
    authDomain: "react-firestore-2021.firebaseapp.com",
    projectId: "react-firestore-2021",
    storageBucket: "react-firestore-2021.appspot.com",
    messagingSenderId: "184121597468",
    appId: "1:184121597468:web:e27b982ca14abcaee849d9",
    measurementId: "G-45BQ9FTL0F"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storeDB = firebase.firestore();

export default storeDB;