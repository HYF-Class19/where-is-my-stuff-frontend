import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";



const firebaseConfig = {
    apiKey: "AIzaSyBvEs03Ef2tKcC62TEk3LiG-PKrfDQK7E0",
    authDomain: "where-s-my-stuff-e0dd7.firebaseapp.com",
    databaseURL: "https://where-s-my-stuff-e0dd7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "where-s-my-stuff-e0dd7",
    storageBucket: "where-s-my-stuff-e0dd7.appspot.com",
    messagingSenderId: "344533614008",
    appId: "1:344533614008:web:5064522dc6d2d8cbb9634d",
    measurementId: "G-2EL97PNDT4"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getDatabase(app);
export const dbRef = ref(db);
export const messaging = getMessaging(app);

export const getMessagingToken = async () => {
    const token = await getToken(messaging);
    return token;
}

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Unable to get permission to notify.');
        }
    });
}



export const initMessaging = () => {
    requestPermission();
    getMessagingToken().then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
}






