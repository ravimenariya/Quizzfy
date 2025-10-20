// src/QuizData.js

export const quizTitle = "The Ultimate Trivia Challenge";
export const quizDescription = "Test your knowledge on a variety of general subjects. You have 60 seconds!";
export const quizTimeLimitSeconds = 60; // Total time for the quiz

export const questions = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    options: [
      { id: 'a', text: "Berlin" },
      { id: 'b', text: "Madrid" },
      { id: 'c', text: "Paris" },
      { id: 'd', text: "Rome" },
    ],
    answerId: 'c', // Correct answer ID
  },
  {
    id: 2,
    questionText: "Which planet is known as the 'Red Planet'?",
    options: [
      { id: 'a', text: "Mars" },
      { id: 'b', text: "Jupiter" },
      { id: 'c', text: "Saturn" },
      { id: 'd', text: "Venus" },
    ],
    answerId: 'a',
  },
  {
    id: 3,
    questionText: "What is 7 multiplied by 8?",
    options: [
      { id: 'a', text: "54" },
      { id: 'b', text: "56" },
      { id: 'c', text: "64" },
      { id: 'd', text: "72" },
    ],
    answerId: 'b',
  },
];