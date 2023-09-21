// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmGMKG7AWzrtvlPRtAQxnd8fj5qx5vO-w",
  authDomain: "testing-4cf05.firebaseapp.com",
  projectId: "testing-4cf05",
  storageBucket: "testing-4cf05.appspot.com",
  messagingSenderId: "469061364589",
  appId: "1:469061364589:web:501df84683ef369042c864"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();