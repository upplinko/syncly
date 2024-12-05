import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase Admin Configuration
const firebaseConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  // Additional configuration if needed
};

// Initialize Firebase Admin SDK
export const initFirebaseAdmin = (): void => {
  if (admin.apps.length === 0) {
    admin.initializeApp(firebaseConfig);
    console.log('🔥 Firebase Admin initialized');
  }
};

// Export the admin instance for use in other parts of the application
export const firebaseAdmin = admin;
