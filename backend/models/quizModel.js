import mongoose from "mongoose";

// A separate schema for questions makes the main Quiz schema cleaner
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required."],
    trim: true,
    maxlength: [300, "Question text cannot exceed 300 characters."],
  },
  // UPDATED: 'options' is now a simple array of strings.
  options: {
    type: [String],
    validate: [
      // Ensures there are at least two options.
      {
        validator: (val) => Array.isArray(val) && val.length >= 2,
        msg: "Each question must have at least 2 options.",
      },
      // Ensures no option is just empty whitespace.
      {
        validator: (val) => val.every((opt) => opt.trim().length > 0),
        msg: "Options cannot be empty.",
      },
    ],
  },
  // NEW: Storing the index of the correct answer.
  correctAnswerIndex: {
    type: Number,
    required: [true, "The index of the correct answer is required."],
    min: [0, "Correct answer index cannot be negative."],
  },
  explanation: {
    type: String,
    trim: true,
    maxlength: [500, "Explanation cannot exceed 500 characters."],
  },
  points: {
    type: Number,
    default: 10,
    min: [1, "Points must be at least 1."],
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required."],
      trim: true,
      maxlength: [120, "Quiz title cannot exceed 120 characters."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    icon: {
      type: String,
      trim: true,
      default: "📝", // Provides a default pencil emoji if no icon is specified
    },
    category: {
      type: String,
      enum: [
        "Technology",
        "Science",
        "History",
        "Art",
        "Sports",
        "General Knowledge",
      ],
      required: [true, "Category is required."],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    timeLimitMinutes: {
      type: Number,
      required: true,
      min: [1, "Time limit must be at least 1 minute."],
    },
    questions: {
      type: [questionSchema],
      validate: [
        (val) => val.length > 0,
        "A quiz must have at least one question.",
      ],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required."],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    plays: {
      type: Number,
      default: 0,
    },
    totalRating: {
      // Sum of all ratings
      type: Number,
      default: 0,
    },
    ratingCount: {
      // Number of users who rated
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Ensure virtuals are included in JSON output
    toObject: { virtuals: true }, // Ensure virtuals are included in Object output
  },
);

// Virtual property to calculate the number of questions
quizSchema.virtual("questionCount").get(function () {
  return this.questions.length;
});

// Virtual property to calculate the average rating on the fly
quizSchema.virtual("averageRating").get(function () {
  if (this.ratingCount === 0) {
    return 0;
  }
  return (this.totalRating / this.ratingCount).toFixed(1);
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
