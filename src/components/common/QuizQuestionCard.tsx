import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizQuestionCardProps {
  question: Question;
  index: number;
  answers: number[];
  onAnswerChange: (questionIndex: number, optionIndex: number) => void;
}

const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({ question, index, answers, onAnswerChange }) => (
  <Card className="rounded-none border-0 shadow-sm bg-card/50">
    <CardContent className="p-8 space-y-6">
      <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
        Question {index + 1}
      </div>
      <div className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground">
        {question.question}
      </div>
      <div className="space-y-3">
        {question.options.map((option, optIndex) => (
          <div
            key={optIndex}
            className={`p-5 border-0 rounded-none transition-all duration-200 cursor-pointer ${
              answers[index] === optIndex
                ? 'bg-muted/30 border-l-4 border-l-primary'
                : 'hover:bg-muted/20'
            }`}
            onClick={() => onAnswerChange(index, optIndex)}
          >
            <label className="flex items-start gap-4 cursor-pointer">
              <div className="flex-shrink-0 mt-1">
                {answers[index] === optIndex ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                )}
              </div>
              <span className="text-lg md:text-xl leading-relaxed text-foreground flex-1">
                {option}
              </span>
            </label>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default QuizQuestionCard;