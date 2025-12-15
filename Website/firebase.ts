// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "eschool-dae22.firebaseapp.com",
  projectId: "eschool-dae22",
  storageBucket: "eschool-dae22.firebasestorage.app",
  messagingSenderId: "301456544021",
  appId: "1:301456544021:web:b50485b779b346d141191c",
  measurementId: "G-YSET8CLM23",
};

if (!firebaseConfig.apiKey) {
  console.error("❌ Firebase API key missing! Check .env prefix (VITE_)");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
