import { initializeApp } from "firebase/app";
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
    apiKey: "AIzaSyD6BMdmu36elFGvxq6M0JtyURoKn-j3JBs",
    authDomain: "electron-d4db0.firebaseapp.com",
    projectId: "electron-d4db0",
    storageBucket: "electron-d4db0.appspot.com",
    messagingSenderId: "1038924191507",
    appId: "1:1038924191507:web:acbf34dd26aecfed1e2ce6"
};

const firebaseapp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseapp)
const database = getDatabase(firebaseapp)
const auth = firebase.auth()
const storage = getStorage(firebaseapp)
const authG = getAuth(firebaseapp)

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
}