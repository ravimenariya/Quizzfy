import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: [{
    text: {
      type: String,
      required: [true, 'Option text is required']
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  explanation: {
    type: String
  },
  points: {
    type: Number,
    default: 1
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    maxlength: [100, 'Quiz title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Quiz description is required'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  timeLimit: {
    type: Number, // in minutes
    default: 10
  },
  questions: [questionSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    default: '📝'
  },
  plays: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  ratingCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for calculating the number of questions
quizSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

// Virtual for calculating the average rating
quizSchema.virtual('averageRating').get(function() {
  return this.ratingCount > 0 ? this.rating / this.ratingCount : 0;
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
