import express from 'express';
import { AuthService } from '../services/auth.service';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Login Route
router.post('/login', AuthService.login);

// Registration Route (Public)
router.post('/register', AuthService.registerUser);

// Get User Profile Route (Protected)
router.get('/profile', 
  AuthMiddleware.verifyToken, 
  AuthService.getProfile
);

// Update User Profile Route (Protected)
router.put('/profile', 
  AuthMiddleware.verifyToken, 
  AuthService.updateProfile
);

// Delete Account Route (Protected)
router.delete('/account', 
  AuthMiddleware.verifyToken, 
  AuthService.deleteAccount
);

// Role Management Routes (Admin Only)
router.put('/roles', 
  AuthMiddleware.verifyToken,
  AuthMiddleware.checkRole('admin'),
  async (req, res) => {
    try {
      const { userId, role } = req.body;

      if (!userId || !role) {
        res.status(400).json({ error: 'User ID and role are required' });
        return;
      }

      // Update user role in Supabase
      const { data, error } = await AuthService.updateUserRole(userId, role);

      if (error) {
        res.status(500).json({ error: 'Failed to update user role' });
        return;
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Role update error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
