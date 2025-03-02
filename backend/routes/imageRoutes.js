import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { asyncHandler } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), asyncHandler(async (req, res) => {
  const { file } = req;
  const { email, breed, confidence } = req.body;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const result = await cloudinary.uploader.upload(file.path);
  const user = await User.findOneAndUpdate(
    { email },
    {
      $push: {
        images: {
          imageUrl: result.secure_url,
          breed,
          confidence
        }
      }
    },
    { new: true }
  );

  res.status(200).json(user);
}));

export default router;
