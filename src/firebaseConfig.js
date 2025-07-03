// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7wrokihzEX2j7WKr61p-4pgq-1H2rlVU",
  authDomain: "test-c7193.firebaseapp.com",
  projectId: "test-c7193",
  storageBucket: "test-c7193.appspot.com",
  messagingSenderId: "610283917960",
  appId: "1:610283917960:web:9270bc4b01f447ff04853d",
  measurementId: "G-PVD6P6F6GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
