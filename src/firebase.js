// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdyBo5iiSRGUDTzeRdxwInijte_y2THlM",
  authDomain: "new-45305.firebaseapp.com",
  projectId: "new-45305",
  storageBucket: "new-45305.appspot.com",
  messagingSenderId: "788381442502",
  appId: "1:788381442502:web:f93aaceba223797d1d12c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);