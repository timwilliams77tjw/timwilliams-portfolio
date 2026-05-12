// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6funyoq5NeY_AzLDh7fBzsSfbZEg_lzY",
  authDomain: "twc-analytics-f0121.firebaseapp.com",
  projectId: "twc-analytics-f0121",
  storageBucket: "twc-analytics-f0121.firebasestorage.app",
  messagingSenderId: "667442318662",
  appId: "1:667442318662:web:a80b107aa46917b855e947",
  measurementId: "G-5BN0X6LEJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
