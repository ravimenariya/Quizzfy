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
router.get('/getuser', protect, (req,res)=>{
  let user={
    username:req.user.username,
    email:req.user.email,
    profilePicture:req.user.profilePicture
  }
  console.log("sending user",user)
  res.status(200).json({
    success:true,
    user
  });
})

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.get('/', protect, admin, getUsers);

export default router;
