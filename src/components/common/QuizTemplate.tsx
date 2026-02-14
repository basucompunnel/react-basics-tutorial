'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestionCard from "./QuizQuestionCard";
import ResultsSummary from "./ResultsSummary";
import ReviewQuestionCard from "./ReviewQuestionCard";
import { useProgressStore } from "@/store/progressStore";

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

interface QuizTemplateProps {
  data: QuizData;
}

const QuizTemplate: React.FC<QuizTemplateProps> = ({ data }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(data.questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const markQuizComplete = useProgressStore((state) => state.markQuizComplete);

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    const passed = score >= passingScore;
    if (passed) {
      markQuizComplete(data.lessonId, data.contentSlug);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === data.questions[index].correct ? score + 1 : score;
    }, 0);
  };

  const hasAtLeastOneAnswer = answers.some(answer => answer !== -1);
  const passPercentage = data.passPercentage || 60;
  const passingScore = Math.ceil((passPercentage / 100) * data.questions.length);

  if (submitted) {
    const score = calculateScore();
    const passed = score >= passingScore;

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <QuizHeader
            lessonSlug={data.lessonSlug}
            title="Quiz Results"
            description={`You scored ${score} out of ${data.questions.length}`}
          />
          <ResultsSummary
            score={score}
            total={data.questions.length}
            passed={passed}
            lessonSlug={data.lessonSlug}
          />
          <div className="space-y-8">
            {data.questions.map((q, index) => (
              <ReviewQuestionCard key={index} question={q} index={index} answers={answers} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <QuizHeader
          lessonSlug={data.lessonSlug}
          title={data.lessonTitle}
          description={data.description}
        />
        <div className="space-y-8">
          {data.questions.map((q, index) => (
            <QuizQuestionCard key={index} question={q} index={index} answers={answers} onAnswerChange={handleAnswerChange} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmit}
            disabled={!hasAtLeastOneAnswer}
            className="px-8 py-4 md:py-5 text-xl rounded-none hover:shadow-xl hover:ring-2 hover:ring-primary/20 transition-all"
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizTemplate;