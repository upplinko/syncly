import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase Service with enhanced user management
export const supabaseService = {
  /**
   * Create or update user profile in Supabase
   * @param userId Firebase User ID
   * @param profileData User profile data
   */
  async createUserProfile(userId: string, profileData: {
    email: string;
    name?: string;
    role?: string;
    avatar_url?: string;
    preferences?: Record<string, unknown>;
  }): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...profileData,
          last_login: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      return { data: null, error };
    }
  },

  /**
   * Get user profile by ID
   * @param userId Firebase User ID
   */
  async getUserProfile(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  /**
   * Get user roles
   * @param userId Firebase User ID
   */
  async getUserRoles(userId: string): Promise<string[]> {
    try {
      const profile = await this.getUserProfile(userId);
      return profile ? [profile.role] : ['user'];
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return ['user'];
    }
  },

  /**
   * Check if user has specific role
   * @param userId Firebase User ID
   * @param requiredRole Role to check
   */
  async hasRole(userId: string, requiredRole: string): Promise<boolean> {
    const userRoles = await this.getUserRoles(userId);
    return userRoles.includes(requiredRole);
  },

  /**
   * Update user preferences
   * @param userId Firebase User ID
   * @param preferences User preferences object
   */
  async updateUserPreferences(
    userId: string, 
    preferences: Record<string, unknown>
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ preferences })
        .eq('id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return { data: null, error };
    }
  }
};
