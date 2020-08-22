import firebase from 'firebase'
const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyBgDeDXbglHJv0rUFT5gSSPiyJe_hKgVGw",
    authDomain: "jobs-point-d7746.firebaseapp.com",
    databaseURL: "https://jobs-point-d7746.firebaseio.com",
    projectId: "jobs-point-d7746",
    storageBucket: "jobs-point-d7746.appspot.com",
    messagingSenderId: "992373602796",
    appId: "1:992373602796:web:4b5e2959f91fe7d40a28c9"
  }
);

const dbTests = firebaseApp.firestore();
export default dbTests;
