// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn5aJrA2fFD_0I-kz7MeEB7KYm4NG_oic",
  authDomain: "adhara-hair.firebaseapp.com",
  projectId: "adhara-hair",
  storageBucket: "adhara-hair.firebasestorage.app",
  messagingSenderId: "436300943035",
  appId: "1:436300943035:web:084e113f7936ab8224e39e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth();
export const db=getFirestore(app)
export default app;