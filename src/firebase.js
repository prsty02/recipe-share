// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYZCcuOgYiUqwtc3N_krbcyVlMhjsQV8g",
  authDomain: "recipe-back.firebaseapp.com",
  projectId: "recipe-back",
  storageBucket: "recipe-back.appspot.com",
  messagingSenderId: "816608483866",
  appId: "1:816608483866:web:4451839b0ce2581eca8fa3",
  measurementId: "G-JH07BXWES6"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

export default app;