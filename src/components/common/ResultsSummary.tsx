import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface ResultsSummaryProps {
  score: number;
  total: number;
  passed: boolean;
  lessonSlug: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ score, total, passed, lessonSlug }) => (
  <Card className="rounded-none mb-12">
    <CardContent className="prose prose-neutral dark:prose-invert text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed md:leading-loose space-y-4 pt-6">
      <div className="text-center">
        {passed ? (
          <div className="text-green-600 dark:text-green-400">
            <CheckCircle className="h-20 w-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
            <p>You've passed the quiz. Great job!</p>
          </div>
        ) : (
          <div className="text-red-600 dark:text-red-400">
            <XCircle className="h-20 w-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Keep Learning</h2>
            <p>Review the material and try again.</p>
          </div>
        )}
        <Button asChild className="mt-6">
          <Link href={`/lesson/${lessonSlug}`}>Back to Lesson</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ResultsSummary;