import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { supabaseService } from '../config/supabase.config';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        name?: string;
        roles?: string[];
      };
    }
  }
}

// Initialize Firebase Admin (you'll need to add Firebase credentials)
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   })
// });

export class AuthMiddleware {
  /**
   * Verify Firebase ID Token
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({ error: 'Malformed token' });
      return;
    }

    try {
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Fetch user roles from Supabase
      const userRoles = await supabaseService.getUserRoles(decodedToken.uid);

      // Attach user information to the request
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        roles: userRoles
      };

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(403).json({ error: 'Unauthorized' });
    }
  }

  /**
   * Check if user has required role
   * @param requiredRole Role required to access the route
   */
  static checkRole(requiredRole: string) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const userId = req.user?.uid;

        if (!userId) {
          res.status(401).json({ error: 'No user ID found' });
          return;
        }

        const hasRequiredRole = await supabaseService.hasRole(userId, requiredRole);

        if (hasRequiredRole) {
          next();
        } else {
          res.status(403).json({ 
            error: 'Insufficient permissions', 
            requiredRole 
          });
        }
      } catch (error) {
        console.error('Role check error:', error);
        res.status(500).json({ error: 'Error checking user roles' });
      }
    };
  }

  /**
   * Middleware to check multiple roles
   * @param requiredRoles Array of roles that can access the route
   */
  static checkAnyRole(requiredRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const userId = req.user?.uid;

        if (!userId) {
          res.status(401).json({ error: 'No user ID found' });
          return;
        }

        const userRoles = await supabaseService.getUserRoles(userId);
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

        if (hasRequiredRole) {
          next();
        } else {
          res.status(403).json({ 
            error: 'Insufficient permissions', 
            requiredRoles 
          });
        }
      } catch (error) {
        console.error('Multiple role check error:', error);
        res.status(500).json({ error: 'Error checking user roles' });
      }
    };
  }
}
