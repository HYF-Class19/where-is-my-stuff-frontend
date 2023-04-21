import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD-rQFOxv52LCGmt4yoxA-bU0obnsEUBFE",
    authDomain: "where-is-my-stuff-89c9a.firebaseapp.com",
    databaseURL: "https://where-is-my-stuff-89c9a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "where-is-my-stuff-89c9a",
    storageBucket: "where-is-my-stuff-89c9a.appspot.com",
    messagingSenderId: "1006547574912",
    appId: "1:1006547574912:web:f065824bf48407d3ed4665",
    measurementId: "G-LHS73Q61YX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);










