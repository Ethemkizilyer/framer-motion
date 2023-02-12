// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfYQj8x--7nqVFgF1muK4WZKGKrvzGDWE",
  authDomain: "deneme-1a7ab.firebaseapp.com",
  projectId: "deneme-1a7ab",
  storageBucket: "deneme-1a7ab.appspot.com",
  messagingSenderId: "50056347451",
  appId: "1:50056347451:web:ff1a955704cbd5058a811e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);