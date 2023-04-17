import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";
import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQTqhymukZh_O2nk_61bOJcEV3CUSowsA",
  authDomain: "electron-8c5fe.firebaseapp.com",
  databaseURL: "https://electron-8c5fe-default-rtdb.firebaseio.com",
  projectId: "electron-8c5fe",
  storageBucket: "electron-8c5fe.appspot.com",
  messagingSenderId: "386202618795",
  appId: "1:386202618795:web:392dfd5337dc5d9e23e0ee"
};


const firebaseapp = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseapp);
const database = getDatabase(firebaseapp);
const auth = firebase.auth();
const storage = getStorage(firebaseapp);
const authG = getAuth(firebaseapp);

export {
  auth,
  firestore,
  firebaseapp,
  storage,
  authG,
  database,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
};