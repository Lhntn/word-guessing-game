import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKy68lIBgG0l8-ujAC4tPUxtuk3RfpXQs",
  authDomain: "wordmastergame-bd55d.firebaseapp.com",
  projectId: "wordmastergame-bd55d",
  storageBucket: "wordmastergame-bd55d.firebasestorage.app",
  messagingSenderId: "1098374728996",
  appId: "1:1098374728996:web:5990e46f1cb1148b41f7b1",
  measurementId: "G-3KLWTLXHSW"   // optional but fine to keep
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);