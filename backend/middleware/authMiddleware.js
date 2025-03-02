import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Middleware to verify Clerk session
export const requireAuth = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    console.error('Auth error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Middleware to handle async errors
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
