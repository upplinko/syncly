import admin from 'firebase-admin';
import { supabase, supabaseService } from '../config/supabase.config';
import { Request, Response } from 'express';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface RegistrationData {
  email: string;
  password: string;
  name?: string;
  organizationId?: string;
  role?: string;
}

interface UserRegistrationResponse {
  userId: string;
  email: string;
  profile: any;
}

export class AuthService {
  /**
   * Verify Firebase token and create/update user in Supabase
   * @param firebaseToken Firebase ID token
   */
  static async verifyAndCreateUser(firebaseToken: string): Promise<UserProfile | null> {
    try {
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
      
      const userProfile: UserProfile = {
        id: decodedToken.uid,
        email: decodedToken.email || '',
        name: decodedToken.name,
        role: 'user' // Default role
      };

      // Upsert user in Supabase
      await supabaseService.createUserProfile(userProfile.id, {
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role
      });

      return userProfile;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  /**
   * Get user profile from Supabase
   * @param userId Firebase User ID
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profile = await supabaseService.getUserProfile(userId);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   * @param userId Firebase User ID
   * @param updateData Profile update data
   */
  static async updateUserProfile(userId: string, updateData: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return null;
    }
  }

  /**
   * Handle user login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { firebaseToken } = req.body;

      if (!firebaseToken) {
        res.status(400).json({ error: 'Firebase token is required' });
        return;
      }

      const userProfile = await this.verifyAndCreateUser(firebaseToken);

      if (!userProfile) {
        res.status(401).json({ error: 'Authentication failed' });
        return;
      }

      res.status(200).json({ 
        message: 'Login successful', 
        user: userProfile 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Handle user profile retrieval
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.uid;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const profile = await this.getUserProfile(userId);

      if (!profile) {
        res.status(404).json({ error: 'Profile not found' });
        return;
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Register a new user
   * @param req Express request object
   * @param res Express response object
   */
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { 
        email, 
        password, 
        name, 
        organizationId, 
        role = 'user' 
      }: RegistrationData = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      // Check if user already exists in Supabase
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (existingUser) {
        res.status(409).json({ error: 'User with this email already exists' });
        return;
      }

      // Create user in Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name
      });

      // Create user profile in Supabase
      const { data: profileData, error: profileError } = await supabaseService.createUserProfile(
        userRecord.uid, 
        {
          email,
          name,
          role,
          preferences: {
            organizationId: organizationId || null
          }
        }
      );

      if (profileError) {
        // Rollback Firebase user creation if Supabase profile creation fails
        await admin.auth().deleteUser(userRecord.uid);
        throw profileError;
      }

      // Prepare response
      const response: UserRegistrationResponse = {
        userId: userRecord.uid,
        email: userRecord.email || email,
        profile: profileData
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.error('User registration error:', error);
      
      // Handle specific error types
      if (error.code === 'auth/email-already-exists') {
        res.status(409).json({ error: 'Email already in use' });
      } else {
        res.status(500).json({ 
          error: 'Registration failed', 
          details: error.message 
        });
      }
    }
  }

  /**
   * Update user profile
   * @param req Express request object
   * @param res Express response object
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.uid;
      
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const updateData = req.body;

      // Prevent updating certain fields
      delete updateData.email;
      delete updateData.role;

      // Update Firebase user display name if provided
      if (updateData.name) {
        await admin.auth().updateUser(userId, {
          displayName: updateData.name
        });
      }

      // Update Supabase profile
      const { data, error } = await supabaseService.createUserProfile(userId, updateData);

      if (error) {
        throw error;
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ 
        error: 'Profile update failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  /**
   * Delete user account
   * @param req Express request object
   * @param res Express response object
   */
  static async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.uid;
      
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Delete user from Firebase
      await admin.auth().deleteUser(userId);

      // Delete user profile from Supabase
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: 'Account successfully deleted' });
    } catch (error) {
      console.error('Account deletion error:', error);
      res.status(500).json({ 
        error: 'Account deletion failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  /**
   * Update user role (admin-only method)
   * @param userId User ID to update
   * @param newRole New role to assign
   */
  static async updateUserRole(userId: string, newRole: string): Promise<{ data: any; error: any }> {
    try {
      // Validate role
      const validRoles = ['user', 'manager', 'admin', 'support'];
      if (!validRoles.includes(newRole)) {
        return { 
          data: null, 
          error: { message: 'Invalid role' } 
        };
      }

      // Update role in Supabase
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Role update error:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error') 
      };
    }
  }
}
