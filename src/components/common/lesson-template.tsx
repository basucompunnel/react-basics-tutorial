"use client";
import { getContentLink } from "@/lib/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight, Book, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProgressStore } from "@/store/progressStore";
import { LessonProgressCard } from "@/components/ui/lesson-progress-card";

export interface LessonPageData {
  id: number;
  title: string;
  description: string;
  link: string;
  content: {
    id: number;
    title: string;
    slug: string;
    description?: string;
  }[];
}

export function LessonTemplate({ data }: { data: LessonPageData }) {
  const getLessonProgress = useProgressStore((state) => state.getLessonProgress);
  const hydrated = useProgressStore((state) => state.hydrated);
  const lessonProgress = getLessonProgress(data.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <LessonHeader title={data.title} description={data.description} />
        <LessonProgress
          hydrated={hydrated}
          lessonProgress={lessonProgress}
        />
        <ContentGrid content={data.content} lessonId={data.id} link={data.link} />
      </div>
    </div>
  );
}

interface LessonHeaderProps {
  title: string;
  description: string;
}

function LessonHeader({ title, description }: LessonHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-lg text-muted-foreground mb-6">
        {description}
      </p>
    </div>
  );
}

interface LessonProgressProps {
  hydrated: boolean;
  lessonProgress: {
    completedTheory: number;
    totalTheory: number;
    completedQuiz: number;
    totalQuiz: number;
    progressPercentage: number;
  };
}

function LessonProgress({ hydrated, lessonProgress }: LessonProgressProps) {
  return (
    <div className="mb-8">
      {hydrated ? (
        <LessonProgressCard
          completedTheory={lessonProgress.completedTheory}
          totalTheory={lessonProgress.totalTheory}
          completedQuiz={lessonProgress.completedQuiz}
          totalQuiz={lessonProgress.totalQuiz}
          progressPercentage={lessonProgress.progressPercentage}
        />
      ) : (
        <div className="animate-pulse">
          <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-sm rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-5 w-5 bg-muted rounded"></div>
                  Overall Progress
                </CardTitle>
                <div className="text-right">
                  <div className="h-8 w-16 bg-muted rounded mb-1"></div>
                  <div className="h-3 w-12 bg-muted rounded"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-2 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

interface ContentGridProps {
  content: {
    id: number;
    title: string;
    slug: string;
    description?: string;
  }[];
  lessonId: number;
  link: string;
}

function ContentGrid({ content, lessonId, link }: ContentGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {content.map((item, index) => (
        <ContentItem key={item.id} item={item} index={index} lessonId={lessonId} link={link} />
      ))}
    </div>
  );
}

interface ContentItemProps {
  item: { id: number; title: string; slug: string; description?: string };
  index: number;
  lessonId: number;
  link: string;
}

function ContentItem({ item, index, lessonId, link }: ContentItemProps) {
  const router = useRouter();
  const getContentProgress = useProgressStore((state) => state.getContentProgress);
  const hydrated = useProgressStore((state) => state.hydrated);
  const progress = getContentProgress(lessonId, item.slug);

  const handleClick = () => {
    const lesson = { id: lessonId, title: "", link, slug: "", content: [] }; // Minimal lesson object for getContentLink
    const url = getContentLink(lesson, item);
    router.push(url);
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary rounded-none cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Go to ${item.title}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {index + 1}
            </span>
            {item.title}
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {item.description || `Learn about ${item.title.toLowerCase()} and its importance in React development.`}
        </p>

        <ProgressIndicators hydrated={hydrated} progress={progress} />

        {/* Placeholder for future content expansion */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-sm text-muted-foreground italic">
            Click to explore detailed content and examples.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProgressIndicatorsProps {
  hydrated: boolean;
  progress: { theoryCompleted: boolean; quizCompleted: boolean } | null;
}

function ProgressIndicators({ hydrated, progress }: ProgressIndicatorsProps) {
  return (
    <div className="mt-4">
      {hydrated ? (
        <div className="flex gap-2" suppressHydrationWarning>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            progress?.theoryCompleted
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800"
              : "bg-muted/50 text-muted-foreground border border-border"
          }`}>
            <Book className={`h-3.5 w-3.5 ${progress?.theoryCompleted ? "text-green-600 dark:text-green-400" : ""}`} />
            <span>Theory</span>
            {progress?.theoryCompleted && <span className="text-green-600 dark:text-green-400">✓</span>}
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            progress?.quizCompleted
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              : "bg-muted/50 text-muted-foreground border border-border"
          }`}>
            <HelpCircle className={`h-3.5 w-3.5 ${progress?.quizCompleted ? "text-blue-600 dark:text-blue-400" : ""}`} />
            <span>Quiz</span>
            {progress?.quizCompleted && <span className="text-blue-600 dark:text-blue-400">✓</span>}
          </div>
        </div>
      ) : (
        <div className="flex gap-2" suppressHydrationWarning>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border animate-pulse">
            <Book className="h-3.5 w-3.5" />
            <span>Theory</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border animate-pulse">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Quiz</span>
          </div>
        </div>
      )}
    </div>
  );
}