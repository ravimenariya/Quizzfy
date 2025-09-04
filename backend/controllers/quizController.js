import Quiz from "../models/quizModel.js";
import QuizAttempt from "../models/quizAttempt.js";

// @desc    Get all published quizzes with filtering and pagination
// @route   GET /api/quizzes
// @access  Public
export const getQuizzes = async (req, res) => {
  try {
    console.log("at backend getting quizzes")
    const { category, difficulty, search, limit = 10, page = 1 } = req.query;


    // Build the filter object based on query parameters
    const filter = { status: "published", ispublic: true }; // Only show published quizzes

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const projection = {
      title: 1,
      description: 1,
      category: 1,
      difficulty: 1,
      timeLimitMinutes: 1,
      icon: 1,
      questionCount: 1,
      averageRating: 1,
    };

      console.log("filter",filter)

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const quizzes = await Quiz.find(filter, projection)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));


    const total = await Quiz.countDocuments(filter);
    // const total = await Quiz.countDocuments();

    res.status(200).json({
      success: true,
      count: quizzes.length,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: quizzes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get a single quiz with its full details (for viewing)
// @route   GET /api/quizzes/:id
// @access  Public
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate(
      "creator",
      "username profilePicture",
    );

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // Allow access only if it's published, or if the user is the creator or an admin
    if (
      quiz.status !== "published" &&
      (!req.user ||
        (req.user.id !== quiz.creator.id.toString() &&
          req.user.role !== "admin"))
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to view this quiz",
        });
    }

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get a quiz for a user to attempt (removes correct answers)
// @route   GET /api/quizzes/:id/attempt
// @access  Private (User must be logged in)
export const getQuizForAttempt = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      // Project out sensitive fields from the questions array
      .select({
        "questions.correctAnswerIndex": 0,
        "questions.explanation": 0,
      });

    if (!quiz || quiz.status !== "published") {
      return res
        .status(404)
        .json({
          success: false,
          message: "Quiz not found or is not available for attempts.",
        });
    }

    // Increment play count when a user fetches it for an attempt
    quiz.playCount += 1;
    await quiz.save();

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (User must be logged in)
export const createQuiz = async (req, res) => {
  try {
    // Assign the logged-in user as the creator
    req.body.creator = req.user.id;

    const quiz = await Quiz.create(req.body);

    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Invalid quiz data provided",
        error: error.message,
      });
  }
};

// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Creator or Admin)
export const updateQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // Check if the user is the creator or an admin
    if (quiz.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to update this quiz",
        });
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Invalid quiz data provided",
        error: error.message,
      });
  }
};

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Creator or Admin)
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    if (quiz.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete this quiz",
        });
    }

    // IMPORTANT: Also delete all attempts associated with this quiz
    await QuizAttempt.deleteMany({ quiz: req.params.id });
    await quiz.deleteOne();

    res
      .status(200)
      .json({
        success: true,
        message: "Quiz and all its attempts have been deleted.",
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Rate a quiz
// @route   POST /api/quizzes/:id/rate
// @access  Private (User must be logged in)
export const rateQuiz = async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide a rating between 1 and 5",
        });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // Update rating based on our schema
    quiz.totalRating += rating;
    quiz.ratingCount += 1;

    await quiz.save();

    res.status(200).json({
      success: true,
      data: {
        totalRating: quiz.totalRating,
        ratingCount: quiz.ratingCount,
        averageRating: quiz.averageRating, // Use the virtual property
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
