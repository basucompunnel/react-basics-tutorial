'use client'

import QuizTemplate from "../common/QuizTemplate";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizData {
  lessonSlug: string;
  lessonTitle: string;
  description: string;
  passPercentage?: number;
  questions: Question[];
  lessonId: number;
  contentSlug: string;
}

const constLetQuiz: QuizData = {
  lessonSlug: "javascript-basics-for-react/const-let",
  lessonTitle: "const vs let Quiz",
  description: "Test your understanding of JavaScript variable declarations",
  passPercentage: 60,
  lessonId: 1,
  contentSlug: "const-let",
  questions: [
    {
      question: "What is the main difference between 'let' and 'const'?",
      options: [
        "'let' is for numbers, 'const' is for strings",
        "'let' allows reassignment, 'const' does not",
        "'let' has global scope, 'const' has local scope",
        "'let' is older, 'const' is newer"
      ],
      correct: 1
    },
    {
      question: "Which of the following is true about 'const'?",
      options: [
        "You can reassign a 'const' variable",
        "'const' variables must be initialized",
        "'const' has function scope",
        "'const' is the same as 'var'"
      ],
      correct: 1
    },
    {
      question: "What happens if you try to reassign a 'const' variable?",
      options: [
        "It works fine",
        "It throws a TypeError",
        "It becomes undefined",
        "It converts to 'let'"
      ],
      correct: 1
    },
    {
      question: "Which scope do 'let' and 'const' have?",
      options: [
        "Function scope",
        "Global scope",
        "Block scope",
        "Module scope"
      ],
      correct: 2
    },
    {
      question: "When should you use 'const'?",
      options: [
        "When you need to reassign the variable",
        "When the variable should not be reassigned",
        "When declaring functions",
        "When declaring loops"
      ],
      correct: 1
    }
  ]
};

export default function ConstLetQuiz() {
  return <QuizTemplate data={constLetQuiz} />;
}
