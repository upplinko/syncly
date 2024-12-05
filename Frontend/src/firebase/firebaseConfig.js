/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDaqEJOa9UuFSddD3PEY9S8MLCtSu02Fwg",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "sncly-74f79.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "sncly-74f79",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "sncly-74f79.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "80705905255",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:80705905255:web:931e43c8058fb47fe8eac2",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-EYRQFNY9X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configure Google Provider for local development
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// For local development, set custom parameters
if (window.location.hostname === 'localhost') {
  googleProvider.setCustomParameters({
    'login_hint': 'user@localhost.com'
  });
}

// Initialize Firebase Authentication
export const auth = getAuth(app);
export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
};
