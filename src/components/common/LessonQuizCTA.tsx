import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgressStore } from "@/store/progressStore";

interface LessonQuizCTAProps {
  title: string;
  subtitle: string;
  quizLink: string;
  lessonId: number;
  contentSlug: string;
}

const LessonQuizCTA: React.FC<LessonQuizCTAProps> = ({ title, subtitle, quizLink, lessonId, contentSlug }) => {
  const markTheoryComplete = useProgressStore((state) => state.markTheoryComplete);

  const handleQuizClick = () => {
    markTheoryComplete(lessonId, contentSlug);
  };

  return (
    <div className="mt-16 mb-16 pt-12 border-t border-muted/50">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <Button asChild className="px-12 py-4 text-lg md:text-xl rounded-none hover:shadow-xl hover:ring-2 hover:ring-primary/20 transition-all duration-300 bg-primary hover:bg-primary/90">
          <Link href={quizLink} onClick={handleQuizClick}>Go to Quiz</Link>
        </Button>
      </div>
    </div>
  );
};

export default LessonQuizCTA;