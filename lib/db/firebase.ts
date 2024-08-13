// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-flashfire.firebaseapp.com",
  projectId: "ai-flashfire",
  storageBucket: "ai-flashfire.appspot.com",
  messagingSenderId: "494193753646",
  appId: "1:494193753646:web:b6fa3ddae9b0d3504be9bf",
  measurementId: "G-CRJZ6CHPZ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
