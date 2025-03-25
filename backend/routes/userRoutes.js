import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  getUsers
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.get('/', protect, admin, getUsers);

export default router;
