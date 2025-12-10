import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What sound does a cat make?",
    correctOptionId: "opt_2",
    options: [
      { id: "opt_1", text: "Bhau-Bhau" },
      { id: "opt_2", text: "Meow-Meow" },
      { id: "opt_3", text: "Oink-Oink" },
    ]
  },
  {
    id: 2,
    text: "What would you probably find in your fridge?",
    correctOptionId: "opt_2",
    options: [
      { id: "opt_1", text: "Shoes" },
      { id: "opt_2", text: "Ice Cream" },
      { id: "opt_3", text: "Books" },
    ]
  },
  {
    id: 3,
    text: "What color are bananas?",
    correctOptionId: "opt_2",
    options: [
      { id: "opt_1", text: "Blue" },
      { id: "opt_2", text: "Yellow" },
      { id: "opt_3", text: "Red" },
    ]
  },
  {
    id: 4,
    text: "How many stars are in the sky?",
    correctOptionId: "opt_2",
    options: [
      { id: "opt_1", text: "Two" },
      { id: "opt_2", text: "Infinite" },
      { id: "opt_3", text: "One Hundred" },
    ]
  }
];