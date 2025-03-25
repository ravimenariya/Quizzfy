import Quiz from '../models/quizModel.js';

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
export const getQuizzes = async (req, res) => {
  try {
    const { category, difficulty, search, limit = 10, page = 1 } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only show public quizzes for regular users
    if (!req.user || req.user.role !== 'admin') {
      filter.isPublic = true;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const quizzes = await Quiz.find(filter)
      .populate('category', 'name icon color')
      .populate('creator', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Quiz.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: quizzes.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('category', 'name icon color')
      .populate('creator', 'username');
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if quiz is private and user is not creator or admin
    if (!quiz.isPublic && 
        (!req.user || 
         (req.user._id.toString() !== quiz.creator._id.toString() && 
          req.user.role !== 'admin'))) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this quiz'
      });
    }
    
    // Increment play count if this is a play request
    if (req.query.play === 'true') {
      quiz.plays += 1;
      await quiz.save();
    }
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private
export const createQuiz = async (req, res) => {
  try {
    // Add creator to body
    req.body.creator = req.user._id;
    
    const quiz = await Quiz.create(req.body);
    
    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid quiz data',
      error: error.message
    });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private
export const updateQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user is quiz creator or admin
    if (quiz.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quiz'
      });
    }
    
    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid quiz data',
      error: error.message
    });
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user is quiz creator or admin
    if (quiz.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this quiz'
      });
    }
    
    await quiz.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Rate a quiz
// @route   POST /api/quizzes/:id/rate
// @access  Private
export const rateQuiz = async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a rating between 1 and 5'
      });
    }
    
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Update rating
    quiz.rating = quiz.rating + rating;
    quiz.ratingCount = quiz.ratingCount + 1;
    
    await quiz.save();
    
    res.status(200).json({
      success: true,
      data: {
        rating: quiz.rating,
        ratingCount: quiz.ratingCount,
        averageRating: quiz.rating / quiz.ratingCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
