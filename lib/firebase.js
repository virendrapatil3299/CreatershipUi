// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYlXFUHj-NKrnLbGhSQyuO6iNn0d_xoQQ",
  authDomain: "creatership-f6c69.firebaseapp.com",
  projectId: "creatership-f6c69",
  storageBucket: "creatership-f6c69.firebasestorage.app",
  messagingSenderId: "1074912680825",
  appId: "1:1074912680825:web:7d55c4cac1e96963156da8",
  measurementId: "G-GNZWS7NVEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);