// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEXMvVLB466qalKZdby8zbR6oXO0_wo1A",
  authDomain: "roman-apps.firebaseapp.com",
  databaseURL: "https://roman-apps-default-rtdb.firebaseio.com",
  projectId: "roman-apps",
  storageBucket: "roman-apps.appspot.com",
  messagingSenderId: "691534944125",
  appId: "1:691534944125:web:a95a2a9f45890c9e639e14",
  measurementId: "G-0HN95SRVNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage()
const db = getFirestore();
const provider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');



export {auth,provider,storage,db,appleProvider}