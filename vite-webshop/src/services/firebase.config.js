import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyARGFN2vLyVtZNIUO5foDnkomMp_DrzfxI",
    authDomain: "webshop-9c827.firebaseapp.com",
    projectId: "webshop-9c827",
    storageBucket: "webshop-9c827.firebasestorage.app",
    messagingSenderId: "329955635459",
    appId: "1:329955635459:web:521208e5968b9997ed3936",
    measurementId: "G-ZXS5EJPZMC"
  };


  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)