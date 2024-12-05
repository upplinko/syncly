import admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase Admin Configuration Test
export const testFirebaseConnection = (): void => {
  try {
    // Log raw private key for debugging
    console.log('Raw Private Key:', process.env.FIREBASE_PRIVATE_KEY);
    
    // Attempt to clean and format the private key
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ?.replace(/\\n/g, '\n')
      .replace(/^"/, '')
      .replace(/"$/, '');

    console.log('Processed Private Key:', privateKey);

    const firebaseConfig = {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    };

    // Initialize Firebase Admin SDK
    if (admin.apps.length === 0) {
      admin.initializeApp(firebaseConfig);
    }

    console.log('✅ Firebase Admin Connection Successful');
    console.log('Firebase Project ID:', process.env.FIREBASE_PROJECT_ID);
  } catch (error) {
    console.error('❌ Firebase Connection Failed:', error);
    if (error instanceof Error) {
      console.error('Error Details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
  }
};

// Supabase Connection Test
export const testSupabaseConnection = (): void => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is missing');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('✅ Supabase Connection Successful');
    console.log('Supabase Project URL:', supabaseUrl);
  } catch (error) {
    console.error('❌ Supabase Connection Failed:', error);
  }
};

// Run connection tests
const runConnectionTests = async () => {
  console.log('🔍 Running Connection Tests...');
  testFirebaseConnection();
  testSupabaseConnection();
};

runConnectionTests();
