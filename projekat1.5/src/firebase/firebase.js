 import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC25K3JDJaMdk0L6e5TeLlaZWRpLSaFtfE",
  authDomain: "frizer-cd584.firebaseapp.com",
  projectId: "frizer-cd584",
  storageBucket: "frizer-cd584.appspot.com",
  messagingSenderId: "336305769429",
  appId: "1:336305769429:web:3127485664651d1192cb5c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);