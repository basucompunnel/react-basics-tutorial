import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface ReviewQuestionCardProps {
  question: Question;
  index: number;
  answers: number[];
}

const ReviewQuestionCard: React.FC<ReviewQuestionCardProps> = ({ question, index, answers }) => (
  <Card className="rounded-none border-0 shadow-sm bg-card/50">
    <CardContent className="p-8 space-y-6">
      <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
        Question {index + 1}
      </div>
      <div className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground">
        {question.question}
      </div>
      <div className="space-y-3">
        {question.options.map((option, optIndex) => {
          const isSelected = answers[index] === optIndex;
          const isCorrect = optIndex === question.correct;
          const isWrongSelected = isSelected && !isCorrect;

          return (
            <div
              key={optIndex}
              className={`p-5 border-0 rounded-none transition-all duration-200 ${
                isCorrect
                  ? 'bg-green-50/50 dark:bg-green-950/10 border-l-4 border-l-green-500'
                  : isWrongSelected
                  ? 'bg-red-50/50 dark:bg-red-950/10 border-l-4 border-l-red-500'
                  : 'bg-muted/10 border-l-4 border-l-muted'
              }`}
            >
              <label className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {isCorrect ? (
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : isWrongSelected ? (
                    <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                  )}
                </div>
                <span className={`text-lg md:text-xl leading-relaxed text-foreground flex-1 ${isCorrect ? 'font-medium' : ''}`}>
                  {option}
                </span>
                {isSelected && !isCorrect && (
                  <span className="text-sm text-muted-foreground self-start mt-1">
                    Your answer
                  </span>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default ReviewQuestionCard;