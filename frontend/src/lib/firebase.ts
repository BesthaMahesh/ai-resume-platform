import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAlNOERMPBHHzqnXqNld_JoRVcub6p7LA0",
    authDomain: "ai-resume-analyzer-7239a.firebaseapp.com",
    projectId: "ai-resume-analyzer-7239a",
    storageBucket: "ai-resume-analyzer-7239a.firebasestorage.app",
    messagingSenderId: "542053597112",
    appId: "1:542053597112:web:c47fdaa089c81b2b34d94d",
    measurementId: "G-EQXERVJPD8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
