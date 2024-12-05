import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Configuration imports
import { initFirebaseAdmin } from './config/firebase.config';
import { supabase } from './config/supabase.config';

// Middleware
import { AuthMiddleware } from './middleware/auth.middleware';

// Routes
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
initFirebaseAdmin();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    firebaseInitialized: true,
    supabaseConnected: supabase !== null
  });
});

// Example protected route
app.get('/protected', AuthMiddleware.verifyToken, (req, res) => {
  res.json({ 
    message: 'Access granted', 
    user: req.user 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Syncly Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;
