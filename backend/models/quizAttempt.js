import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    answers: {
      type: [
        {
          _id: false, // Don't create a separate _id for each answer object
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          // Storing the index the user selected. This is the new primary field.
          givenAnswerIndex: {
            type: Number,
            required: true,
          },
          // Storing the actual text for historical accuracy.
          // This protects against future edits to the original quiz question.
          givenAnswerText: {
            type: String,
            required: true,
          },
          // Storing whether it was correct at the time of submission.
          // This simplifies report generation later.
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);

export default QuizAttempt;
