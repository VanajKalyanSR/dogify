import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  breed: String,
  confidence: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  lastSignIn: {
    type: Date,
    default: Date.now
  },
  images: [imageSchema]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
