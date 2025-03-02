import express from 'express';
import { asyncHandler } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';

const router = express.Router();

// Sync user from frontend
router.post('/sync', asyncHandler(async (req, res) => {
  const { email, firstName, lastName, profileImageUrl } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const userData = {
    email,
    firstName: firstName || '',
    lastName: lastName || '',
    profileImageUrl: profileImageUrl || '',
    lastSignIn: new Date()
  };

  const user = await User.findOneAndUpdate(
    { email },
    userData,
    { new: true, upsert: true }
  );

  res.status(200).json(user);
}));

// Get user profile
router.get('/profile', asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.status(200).json(user);
}));

// Get all users (admin only - you should add admin check in production)
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-__v');
  res.status(200).json(users);
}));

export default router;
