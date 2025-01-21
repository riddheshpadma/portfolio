// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrzJtr-EbA-EntS1X-Qkk5sX1Fl8TPUds",
    authDomain: "portfolio-79c3f.firebaseapp.com",
    projectId: "portfolio-79c3f",
    storageBucket: "portfolio-79c3f.firebasestorage.app",
    messagingSenderId: "778534841087",
    appId: "1:778534841087:web:eb9dbe619b4750e57a7aca",
    measurementId: "G-NJ1HVL5VQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAnalytics(app);

export { db };