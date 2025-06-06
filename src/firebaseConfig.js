// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAruzUxCdHuM-b6tjEZ06z_CY8vZ8tuaOY",
    authDomain: "futapp-90a79.firebaseapp.com",
    projectId: "futapp-90a79",
    storageBucket: "futapp-90a79.firebasestorage.app",
    messagingSenderId: "273164982688",
    appId: "1:273164982688:web:2e3c7d348931a8f8f3acc5",
    measurementId: "G-JRWJMENXN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 