import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTr0oXv3Zxh_HWnY84djI0O3cubK-HBoE",
  authDomain: "omnilang-c909c.firebaseapp.com",
  projectId: "omnilang-c909c",
  storageBucket: "omnilang-c909c.appspot.com",
  appId: "1:124792854344:web:e1ac89966ab8709d43057d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Google Auth provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;