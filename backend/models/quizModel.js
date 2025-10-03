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
    type: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ]
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
        "Geography",
        "Entertainment",
        "Literature",
        "Music",
        "Movies",
        "Food",
        "Business",
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
    ispublic: {
      type: Boolean,
      default: true,
    },
    questions: {
      type: [questionSchema],
      validate: [
        (val) => val.length > 0,
        "A quiz must have at least one question.",
      ],
    },
    questionCount: {
      type: Number,
      default: 0,
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
    averageRating: {
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

quizSchema.pre("save", function (next) {
  if (this.isModified("questions")) {
    this.questionCount = this.questions.length;
  }
  next();
});

quizSchema.pre("save", function (next) {
  if (this.isModified("ratingCount")) {
    this.averageRating = (this.totalRating / this.ratingCount).toFixed(1);
  }
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
