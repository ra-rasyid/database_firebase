// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChHKHWnyusBjpUNSyEr4tbHK2Yj7VxQKw",
  authDomain: "fullstack-birumuda.firebaseapp.com",
  projectId: "fullstack-birumuda",
  storageBucket: "fullstack-birumuda.appspot.com",
  messagingSenderId: "14031952623",
  appId: "1:14031952623:web:f5421a40d210cea893991a",
  measurementId: "G-9W7NT0DDHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi Firestore
const db = getFirestore(app);

export { db };