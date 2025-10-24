// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVcd8gESrPlEJmg3_nAiiszbqLqKx1s_Q",
  authDomain: "eschool-5c87d.firebaseapp.com",
  projectId: "eschool-5c87d",
  storageBucket: "eschool-5c87d.firebasestorage.app",
  messagingSenderId: "896539972759",
  appId: "1:896539972759:web:195c214a2a3f96ee24c5d2",
  measurementId: "G-BX8T6C5MHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
