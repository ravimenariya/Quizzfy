import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Quiz from "./models/quizModel.js";
import QuizAttempt from "./models/quizAttempt.js";

dotenv.config();

// --- DUMMY DATA ---
// Correctly defined user data, with Dravon as the only admin.
const users = [
  {
    username: "Dravon",
    email: "dravon@example.com",
    password: "password123",
    role: "admin",
    profilePicture: "https://placehold.co/150x150/F8A137/FFFFFF?text=D",
  },
  {
    username: "Alice",
    email: "alice@example.com",
    password: "password123",
    profilePicture: "https://placehold.co/150x150/6495ED/FFFFFF?text=A",
  },
  {
    username: "Bob",
    email: "bob@example.com",
    password: "password123",
    profilePicture: "https://placehold.co/150x150/32CD32/FFFFFF?text=B",
  },
];

const questionPool = {
  Technology: [
    {
      questionText: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Process Unit",
      ],
      correctAnswerIndex: 0,
      points: 10,
      explanation:
        "CPU is the primary component of a computer that executes instructions.",
    },
    {
      questionText: "Which HTML tag is used to define an internal style sheet?",
      options: ["<script>", "<css>", "<style>"],
      correctAnswerIndex: 2,
      points: 10,
    },
    {
      questionText: "What is the most popular programming language in 2023?",
      options: ["Python", "JavaScript", "Java"],
      correctAnswerIndex: 0,
      points: 15,
      explanation:
        "According to most surveys like TIOBE and Stack Overflow, Python remains the most popular language.",
    },
  ],
  Science: [
    {
      questionText: "What is the chemical symbol for Gold?",
      options: ["Ag", "Au", "Go"],
      correctAnswerIndex: 1,
      points: 5,
      explanation: 'The symbol Au comes from the Latin word for gold, "aurum".',
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus"],
      correctAnswerIndex: 0,
      points: 5,
    },
    {
      questionText: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondrion"],
      correctAnswerIndex: 2,
      points: 10,
    },
  ],
  History: [
    {
      questionText: "In which year did World War II end?",
      options: ["1945", "1939", "1918"],
      correctAnswerIndex: 0,
      points: 10,
    },
    {
      questionText: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"],
      correctAnswerIndex: 1,
      points: 5,
    },
  ],
};

// NEW: Added a map for category icons
const categoryIcons = {
  Technology: "💻",
  Science: "🔬",
  History: "📜",
};

// --- HELPER FUNCTIONS ---
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// --- SEEDING SCRIPT ---
const seedDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in your .env file.");
    process.exit(1);
  }

  try {
    // 1. CONNECT TO DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");

    // 2. WIPE EXISTING DATA
    console.log("Clearing database...");
    await User.deleteMany({});
    await Quiz.deleteMany({});
    await QuizAttempt.deleteMany({});

    // 3. CREATE USERS
    console.log("Creating users...");
    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} users created.`);

    // 4. CREATE QUIZZES
    console.log("Creating quizzes...");
    let createdQuizzes = [];
    const categories = [
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
    ];

    for (let i = 0; i < 5; i++) {
      const creator = getRandom(createdUsers);
      const category = getRandom(categories);
      const questionsForQuiz = [];
      const numQuestions = getRandomNumber(1, questionPool[category].length);

      const shuffledQuestions = [...questionPool[category]].sort(
        () => 0.5 - Math.random(),
      );

      for (let j = 0; j < numQuestions; j++) {
        questionsForQuiz.push(shuffledQuestions[j]);
      }

      const quizData = {
        title: `Ultimate ${category} Challenge`,
        description: `Test your knowledge of ${category} with these tough questions.`,
        category,
        difficulty: getRandom(["Easy", "Medium", "Hard"]),
        timeLimitMinutes: numQuestions * 1,
        questions: questionsForQuiz,
        creator: creator._id,
        status: "published",
        tags: [category.toLowerCase(), "challenge"],
        icon: categoryIcons[category] || "❓", // UPDATED: Added icon field
      };
      createdQuizzes.push(quizData);
    }
    createdQuizzes = await Quiz.create(createdQuizzes);
    console.log(`${createdQuizzes.length} quizzes created.`);

    // 5. CREATE QUIZ ATTEMPTS
    console.log("Creating quiz attempts...");
    let attemptsToCreate = [];
    for (const quiz of createdQuizzes) {
      const numAttempts = getRandomNumber(0, 3);
      let totalRatingSumForQuiz = 0;
      let ratingCountForQuiz = 0;

      if (numAttempts > 0) {
        for (let i = 0; i < numAttempts; i++) {
          const user = getRandom(createdUsers);
          let score = 0;
          const answers = [];

          quiz.questions.forEach((question) => {
            const givenAnswerIndex = getRandomNumber(
              0,
              question.options.length - 1,
            );
            const isCorrect = givenAnswerIndex === question.correctAnswerIndex;
            if (isCorrect) {
              score += question.points;
            }
            answers.push({
              questionId: question._id,
              givenAnswerIndex,
              givenAnswerText: question.options[givenAnswerIndex],
              isCorrect,
            });
          });

          attemptsToCreate.push({
            quiz: quiz._id,
            user: user._id,
            score,
            answers,
          });

          // Aggregate stats for the quiz
          ratingCountForQuiz++;
          totalRatingSumForQuiz += getRandomNumber(3, 5); // A random rating from 3 to 5 stars
        }
      }

      // Update quiz stats after all attempts for it are simulated
      if (ratingCountForQuiz > 0) {
        quiz.playCount = numAttempts;
        quiz.totalRating = totalRatingSumForQuiz;
        quiz.ratingCount = ratingCountForQuiz;
        await quiz.save();
      }
    }

    if (attemptsToCreate.length > 0) {
      await QuizAttempt.create(attemptsToCreate);
      console.log(`${attemptsToCreate.length} quiz attempts created.`);
    } else {
      console.log("No quiz attempts were created this time.");
    }

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedDatabase();
