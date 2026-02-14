import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface QuizHeaderProps {
  lessonSlug: string;
  title: string;
  description: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ lessonSlug, title, description }) => (
  <div className="mb-8">
    <Link
      href={`/lesson/${lessonSlug}`}
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Lesson
    </Link>
    <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
    <p className="text-lg text-muted-foreground">{description}</p>
  </div>
);

export default QuizHeader;