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
  apiKey: "AIzaSyC33E5v7UMnYKCejE3Yz0SAmFiKLBHDvNU",
  authDomain: "electron-46865.firebaseapp.com",
  databaseURL: "https://electron-46865-default-rtdb.firebaseio.com",
  projectId: "electron-46865",
  storageBucket: "electron-46865.appspot.com",
  messagingSenderId: "101796657992",
  appId: "1:101796657992:web:125493a1e8ea8b3b22117d"
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