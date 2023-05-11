import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBvEs03Ef2tKcC62TEk3LiG-PKrfDQK7E0",
    authDomain: "where-s-my-stuff-e0dd7.firebaseapp.com",
    databaseURL: "https://where-s-my-stuff-e0dd7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "where-s-my-stuff-e0dd7",
    storageBucket: "where-s-my-stuff-e0dd7.appspot.com",
    messagingSenderId: "344533614008",
    appId: "1:344533614008:web:5064522dc6d2d8cbb9634d",
    measurementId: "G-2EL97PNDT4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);










