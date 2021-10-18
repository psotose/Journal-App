import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, onAuthStateChange } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBgEcyT8TCYGWaTbaP5rcu8oBquJ7hik0Q",
  authDomain: "react-app-curso-2be39.firebaseapp.com",
  projectId: "react-app-curso-2be39",
  storageBucket: "react-app-curso-2be39.appspot.com",
  messagingSenderId: "189705796477",
  appId: "1:189705796477:web:a5347720ac7cfe3b39aa14"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
}