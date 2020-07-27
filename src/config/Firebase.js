import firebase from 'firebase/app'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyC5vGT7IBlJM8VwlfRWplsexPOX8G41s0A",
    authDomain: "immotool-v3.firebaseapp.com",
    databaseURL: "https://immotool-v3.firebaseio.com",
    projectId: "immotool-v3",
    storageBucket: "immotool-v3.appspot.com",
    messagingSenderId: "586467059808",
    appId: "1:586467059808:web:f0dfff62d78c49c7d13b05"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;