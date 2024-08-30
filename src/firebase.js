// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdn2TjQrMFFOhXfHzjonJXMol0ON1Hkgs",
  authDomain: "podify-d1bcc.firebaseapp.com",
  projectId: "podify-d1bcc",
  storageBucket: "podify-d1bcc.appspot.com",
  messagingSenderId: "431954075293",
  appId: "1:431954075293:web:93a67f91715c98cab2fe74",
  measurementId: "G-40VM2ZQ9BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };