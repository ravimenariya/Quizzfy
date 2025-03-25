import express from 'express';
import { 
  getQuizzes, 
  getQuiz, 
  createQuiz, 
  updateQuiz, 
  deleteQuiz,
  rateQuiz
} from '../controllers/quizController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getQuizzes);
router.get('/:id', getQuiz);

// Protected routes
router.post('/', protect, createQuiz);
router.put('/:id', protect, updateQuiz);
router.delete('/:id', protect, deleteQuiz);
router.post('/:id/rate', protect, rateQuiz);

export default router;
