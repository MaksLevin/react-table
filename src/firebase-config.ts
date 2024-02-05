import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWPvAHjJrZEwlItf6di-wQDia0TDHiN5w",
  authDomain: "react-table-59ce0.firebaseapp.com",
  projectId: "react-table-59ce0",
  storageBucket: "react-table-59ce0.appspot.com",
  messagingSenderId: "849526077388",
  appId: "1:849526077388:web:a485309a2e0969f1c04f69",
  measurementId: "G-3YX44T000P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);