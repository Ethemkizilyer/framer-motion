import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfYQj8x--7nqVFgF1muK4WZKGKrvzGDWE",
  authDomain: "deneme-1a7ab.firebaseapp.com",
  projectId: "deneme-1a7ab",
  storageBucket: "deneme-1a7ab.appspot.com",
  messagingSenderId: "50056347451",
  appId: "1:50056347451:web:ff1a955704cbd5058a811e",
  measurementId: "G-7JG6WXS7T7",
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebase);
const provider = new GoogleAuthProvider();
export { auth, provider };
export default db;
