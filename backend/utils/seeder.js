import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import Quiz from '../models/quizModel.js';

// Load env vars
dotenv.config();

// Sample data
const users = [
  {
    username: 'admin',
    email: 'admin@quizzfy.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
    profilePicture: 'admin.jpg'
  },
  {
    username: 'john',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'user',
    profilePicture: 'john.jpg'
  }
];

const categories = [
  {
    name: 'Science',
    description: 'Science related quizzes',
    icon: '🧪',
    color: '#10B981' // Green
  },
  {
    name: 'Geography',
    description: 'Geography related quizzes',
    icon: '🌍',
    color: '#3B82F6' // Blue
  },
  {
    name: 'History',
    description: 'History related quizzes',
    icon: '🏛️',
    color: '#F59E0B' // Amber
  },
  {
    name: 'Movies',
    description: 'Movies related quizzes',
    icon: '🎬',
    color: '#EC4899' // Pink
  },
  {
    name: 'Sports',
    description: 'Sports related quizzes',
    icon: '🏀',
    color: '#EF4444' // Red
  },
  {
    name: 'Literature',
    description: 'Literature related quizzes',
    icon: '📚',
    color: '#8B5CF6' // Purple
  }
];

// Import data into DB
const importData = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Quiz.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Insert categories
    const createdCategories = await Category.insertMany(categories);

    // Create sample quizzes
    const sampleQuizzes = [
      {
        title: 'Basic Science Quiz',
        description: 'Test your knowledge of basic scientific concepts',
        category: createdCategories[0]._id,
        difficulty: 'easy',
        timeLimit: 10,
        creator: adminUser,
        icon: '🧪',
        tags: ['science', 'basics', 'general knowledge'],
        questions: [
          {
            text: 'What is the chemical symbol for water?',
            options: [
              { text: 'H2O', isCorrect: true },
              { text: 'CO2', isCorrect: false },
              { text: 'O2', isCorrect: false },
              { text: 'NaCl', isCorrect: false }
            ],
            explanation: 'Water is composed of two hydrogen atoms and one oxygen atom.',
            points: 1
          },
          {
            text: 'What is the largest planet in our solar system?',
            options: [
              { text: 'Earth', isCorrect: false },
              { text: 'Mars', isCorrect: false },
              { text: 'Jupiter', isCorrect: true },
              { text: 'Saturn', isCorrect: false }
            ],
            explanation: 'Jupiter is the largest planet in our solar system.',
            points: 1
          }
        ]
      },
      {
        title: 'World Geography Challenge',
        description: 'Test your knowledge of world geography',
        category: createdCategories[1]._id,
        difficulty: 'medium',
        timeLimit: 15,
        creator: adminUser,
        icon: '🌍',
        tags: ['geography', 'world', 'countries'],
        questions: [
          {
            text: 'What is the capital of France?',
            options: [
              { text: 'London', isCorrect: false },
              { text: 'Berlin', isCorrect: false },
              { text: 'Paris', isCorrect: true },
              { text: 'Rome', isCorrect: false }
            ],
            explanation: 'Paris is the capital city of France.',
            points: 1
          },
          {
            text: 'Which is the largest ocean on Earth?',
            options: [
              { text: 'Atlantic Ocean', isCorrect: false },
              { text: 'Indian Ocean', isCorrect: false },
              { text: 'Arctic Ocean', isCorrect: false },
              { text: 'Pacific Ocean', isCorrect: true }
            ],
            explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
            points: 1
          }
        ]
      }
    ];

    // Insert quizzes
    await Quiz.insertMany(sampleQuizzes);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    // Connect to database
    await connectDB();
    
    await User.deleteMany();
    await Category.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line args
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
