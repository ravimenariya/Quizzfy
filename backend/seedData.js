import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import colors from 'colors';

// Import models
import User from './models/userModel.js';
import Category from './models/categoryModel.js';
import Quiz from './models/quizModel.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use direct connection string if MONGO_URI is not available in environment variables
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizzfy';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Sample data
const categories = [
  {
    name: 'Science',
    description: 'Test your knowledge of scientific concepts and discoveries',
    icon: '🧪',
    color: '#16a34a' // Green
  },
  {
    name: 'History',
    description: 'Explore events and people from the past',
    icon: '🏛️',
    color: '#b45309' // Amber
  },
  {
    name: 'Geography',
    description: 'Test your knowledge of countries, capitals, and landmarks',
    icon: '🌍',
    color: '#0284c7' // Sky blue
  },
  {
    name: 'Literature',
    description: 'Explore famous books, authors, and literary works',
    icon: '📚',
    color: '#7c3aed' // Violet
  },
  {
    name: 'Movies',
    description: 'Test your knowledge of films, actors, and directors',
    icon: '🎬',
    color: '#e11d48' // Rose
  },
  {
    name: 'Sports',
    description: 'Questions about various sports and sporting events',
    icon: '⚽',
    color: '#ea580c' // Orange
  },
  {
    name: 'Music',
    description: 'Test your knowledge of songs, artists, and music history',
    icon: '🎵',
    color: '#8b5cf6' // Purple
  },
  {
    name: 'Technology',
    description: 'Questions about computers, gadgets, and tech innovations',
    icon: '💻',
    color: '#0891b2' // Cyan
  }
];

const users = [
  {
    username: 'admin',
    email: 'admin@quizzfy.com',
    password: 'password123',
    role: 'admin',
    profilePicture: 'admin.jpg'
  },
  {
    username: 'john',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    profilePicture: 'john.jpg'
  },
  {
    username: 'sarah',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'user',
    profilePicture: 'sarah.jpg'
  }
];

// Function to import data
const importData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Quiz.deleteMany();

    console.log('Existing data cleared'.yellow);

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories inserted`.green);

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );
    
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`${createdUsers.length} users inserted`.green);

    // Create sample quizzes
    const sampleQuizzes = [
      {
        title: 'Basic Science Quiz',
        description: 'Test your knowledge of basic scientific concepts',
        category: createdCategories[0]._id, // Science
        difficulty: 'easy',
        timeLimit: 10,
        creator: createdUsers[0]._id, // admin
        isPublic: true,
        tags: ['science', 'basics', 'beginner'],
        questions: [
          {
            text: 'What is the chemical symbol for water?',
            options: [
              { text: 'H2O', isCorrect: true },
              { text: 'CO2', isCorrect: false },
              { text: 'O2', isCorrect: false },
              { text: 'NaCl', isCorrect: false }
            ],
            explanation: 'Water is composed of two hydrogen atoms and one oxygen atom, hence H2O.',
            points: 1
          },
          {
            text: 'Which planet is known as the Red Planet?',
            options: [
              { text: 'Venus', isCorrect: false },
              { text: 'Mars', isCorrect: true },
              { text: 'Jupiter', isCorrect: false },
              { text: 'Saturn', isCorrect: false }
            ],
            explanation: 'Mars appears red due to iron oxide (rust) on its surface.',
            points: 1
          },
          {
            text: 'What is the largest organ in the human body?',
            options: [
              { text: 'Heart', isCorrect: false },
              { text: 'Liver', isCorrect: false },
              { text: 'Skin', isCorrect: true },
              { text: 'Brain', isCorrect: false }
            ],
            explanation: 'The skin is the largest organ, covering the entire body.',
            points: 1
          }
        ]
      },
      {
        title: 'World History',
        description: 'Test your knowledge of important historical events',
        category: createdCategories[1]._id, // History
        difficulty: 'medium',
        timeLimit: 15,
        creator: createdUsers[1]._id, // john
        isPublic: true,
        tags: ['history', 'world', 'events'],
        questions: [
          {
            text: 'In which year did World War II end?',
            options: [
              { text: '1943', isCorrect: false },
              { text: '1945', isCorrect: true },
              { text: '1947', isCorrect: false },
              { text: '1950', isCorrect: false }
            ],
            explanation: 'World War II ended in 1945 with the surrender of Japan after the atomic bombings of Hiroshima and Nagasaki.',
            points: 1
          },
          {
            text: 'Who was the first President of the United States?',
            options: [
              { text: 'Thomas Jefferson', isCorrect: false },
              { text: 'John Adams', isCorrect: false },
              { text: 'George Washington', isCorrect: true },
              { text: 'Benjamin Franklin', isCorrect: false }
            ],
            explanation: 'George Washington served as the first President from 1789 to 1797.',
            points: 1
          },
          {
            text: 'The French Revolution began in which year?',
            options: [
              { text: '1789', isCorrect: true },
              { text: '1776', isCorrect: false },
              { text: '1804', isCorrect: false },
              { text: '1812', isCorrect: false }
            ],
            explanation: 'The French Revolution began in 1789 with the storming of the Bastille.',
            points: 1
          }
        ]
      },
      {
        title: 'Geography Challenge',
        description: 'Test your knowledge of world geography',
        category: createdCategories[2]._id, // Geography
        difficulty: 'medium',
        timeLimit: 12,
        creator: createdUsers[2]._id, // sarah
        isPublic: true,
        tags: ['geography', 'countries', 'capitals'],
        questions: [
          {
            text: 'What is the capital of Australia?',
            options: [
              { text: 'Sydney', isCorrect: false },
              { text: 'Melbourne', isCorrect: false },
              { text: 'Canberra', isCorrect: true },
              { text: 'Perth', isCorrect: false }
            ],
            explanation: 'Canberra is the capital city of Australia, not Sydney or Melbourne as many people think.',
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
          },
          {
            text: 'The Great Barrier Reef is located in which country?',
            options: [
              { text: 'Brazil', isCorrect: false },
              { text: 'Australia', isCorrect: true },
              { text: 'Thailand', isCorrect: false },
              { text: 'Mexico', isCorrect: false }
            ],
            explanation: 'The Great Barrier Reef is located off the coast of Queensland, Australia.',
            points: 1
          }
        ]
      },
      {
        title: 'Classic Literature',
        description: 'Test your knowledge of classic literary works',
        category: createdCategories[3]._id, // Literature
        difficulty: 'hard',
        timeLimit: 15,
        creator: createdUsers[0]._id, // admin
        isPublic: true,
        tags: ['literature', 'books', 'authors'],
        questions: [
          {
            text: 'Who wrote "Pride and Prejudice"?',
            options: [
              { text: 'Jane Austen', isCorrect: true },
              { text: 'Charlotte Brontë', isCorrect: false },
              { text: 'Emily Brontë', isCorrect: false },
              { text: 'Virginia Woolf', isCorrect: false }
            ],
            explanation: 'Pride and Prejudice was written by Jane Austen and published in 1813.',
            points: 1
          },
          {
            text: 'In which Shakespeare play does the character Ophelia appear?',
            options: [
              { text: 'Macbeth', isCorrect: false },
              { text: 'Romeo and Juliet', isCorrect: false },
              { text: 'Hamlet', isCorrect: true },
              { text: 'King Lear', isCorrect: false }
            ],
            explanation: 'Ophelia is a character in Shakespeare\'s play Hamlet.',
            points: 1
          },
          {
            text: 'Who wrote "1984"?',
            options: [
              { text: 'Aldous Huxley', isCorrect: false },
              { text: 'George Orwell', isCorrect: true },
              { text: 'Ray Bradbury', isCorrect: false },
              { text: 'H.G. Wells', isCorrect: false }
            ],
            explanation: '1984 is a dystopian novel written by George Orwell and published in 1949.',
            points: 1
          }
        ]
      },
      {
        title: 'Movie Trivia',
        description: 'Test your knowledge of popular films',
        category: createdCategories[4]._id, // Movies
        difficulty: 'easy',
        timeLimit: 10,
        creator: createdUsers[1]._id, // john
        isPublic: true,
        tags: ['movies', 'cinema', 'actors'],
        questions: [
          {
            text: 'Which film won the Academy Award for Best Picture in 2020?',
            options: [
              { text: '1917', isCorrect: false },
              { text: 'Joker', isCorrect: false },
              { text: 'Parasite', isCorrect: true },
              { text: 'Once Upon a Time in Hollywood', isCorrect: false }
            ],
            explanation: 'Parasite, directed by Bong Joon-ho, was the first non-English language film to win Best Picture.',
            points: 1
          },
          {
            text: 'Who played the character of Iron Man in the Marvel Cinematic Universe?',
            options: [
              { text: 'Chris Evans', isCorrect: false },
              { text: 'Robert Downey Jr.', isCorrect: true },
              { text: 'Chris Hemsworth', isCorrect: false },
              { text: 'Mark Ruffalo', isCorrect: false }
            ],
            explanation: 'Robert Downey Jr. played Tony Stark/Iron Man in the Marvel Cinematic Universe.',
            points: 1
          },
          {
            text: 'Which of these films was NOT directed by Christopher Nolan?',
            options: [
              { text: 'Inception', isCorrect: false },
              { text: 'Interstellar', isCorrect: false },
              { text: 'The Martian', isCorrect: true },
              { text: 'Dunkirk', isCorrect: false }
            ],
            explanation: 'The Martian was directed by Ridley Scott, not Christopher Nolan.',
            points: 1
          }
        ]
      }
    ];

    const createdQuizzes = await Quiz.insertMany(sampleQuizzes);
    console.log(`${createdQuizzes.length} quizzes inserted`.green);

    // Update users with created quizzes
    await User.findByIdAndUpdate(
      createdUsers[0]._id,
      { $push: { quizzesCreated: [createdQuizzes[0]._id, createdQuizzes[3]._id] } }
    );

    await User.findByIdAndUpdate(
      createdUsers[1]._id,
      { $push: { quizzesCreated: [createdQuizzes[1]._id, createdQuizzes[4]._id] } }
    );

    await User.findByIdAndUpdate(
      createdUsers[2]._id,
      { $push: { quizzesCreated: [createdQuizzes[2]._id] } }
    );

    console.log('User quiz references updated'.green);
    console.log('Sample data imported successfully!'.green.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Quiz.deleteMany();

    console.log('All data destroyed!'.red.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Run the script based on command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
