import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcG9jjOqWZNzfNQEEZ0vjhH3IglmAXTR0",
    authDomain: "notion-clone-prayas.firebaseapp.com",
    projectId: "notion-clone-prayas",
    storageBucket: "notion-clone-prayas.appspot.com",
    messagingSenderId: "179260078771",
    appId: "1:179260078771:web:2e4f0e25aa7b87e90ecec6",
    measurementId: "G-WJMCZD5T35"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  export {db};