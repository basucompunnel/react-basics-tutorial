'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { lessons } from "@/lib/lessons";
import { Book, HelpCircle, CheckCircle, TrendingUp, ChevronRight } from "lucide-react";
import { useProgressStore } from "@/store/progressStore";
import { useRouter } from "next/navigation";

interface ProgressCardProps {
  title: string;
  icon: React.ReactNode;
  completed: number;
  total: number;
  className?: string;
}

function ProgressCard({ title, icon, completed, total, className }: ProgressCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card className={`relative overflow-hidden rounded-none border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className ?? ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-none bg-white/50 dark:bg-white/10">
            {icon}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{percentage}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completed} / {total}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OverallProgressProps {
  overall: {
    completedTheory: number;
    totalTheory: number;
    completedQuiz: number;
    totalQuiz: number;
    completed: number;
    total: number;
  };
}

function OverallProgress({ overall }: OverallProgressProps) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Overall Progress</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCard
          title="Theory Progress"
          icon={<Book className="h-6 w-6 text-blue-600" />}
          completed={overall.completedTheory}
          total={overall.totalTheory}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
        />
        <ProgressCard
          title="Quiz Progress"
          icon={<HelpCircle className="h-6 w-6 text-yellow-600" />}
          completed={overall.completedQuiz}
          total={overall.totalQuiz}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800"
        />
        <ProgressCard
          title="Total Progress"
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          completed={overall.completed}
          total={overall.total}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800"
        />
      </div>
    </div>
  );
}

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    content: { id: number; title: string }[];
    link: string;
  };
  completedTheory: number;
  totalTheory: number;
  completedQuiz: number;
  totalQuiz: number;
  completed: number;
  total: number;
}

function LessonCard({ lesson, completedTheory, totalTheory, completedQuiz, totalQuiz, completed, total }: LessonCardProps) {
  const router = useRouter();
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary rounded-none cursor-pointer"
      onClick={() => router.push(lesson.link)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(lesson.link);
        }
      }}
      aria-label={`Go to ${lesson.title} lesson`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {lesson.id}
            </span>
            {lesson.title}
          </span>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="text-lg font-bold">{progressPercentage}%</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Book className="h-5 w-5 text-blue-600" />
              Topics Covered ({lesson.content.length})
            </h4>
            <ul className="space-y-2">
              {lesson.content.slice(0, 3).map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  {item.title}
                </li>
              ))}
              {lesson.content.length > 3 && (
                <li className="text-sm text-muted-foreground italic">
                  +{lesson.content.length - 3} more topics...
                </li>
              )}
            </ul>
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Book className="h-4 w-4 text-blue-600" />
                <span>{completedTheory}/{totalTheory}</span>
              </div>
              <div className="flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-yellow-600" />
                <span>{completedQuiz}/{totalQuiz}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{completed}/{total}</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
        {/* Placeholder for future content expansion */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-sm text-muted-foreground italic">
            Click to start learning this lesson.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const getLessonProgress = useProgressStore((state) => state.getLessonProgress);
  const hydrated = useProgressStore((state) => state.hydrated);

  // Calculate overall progress
  const overall = lessons.reduce(
    (acc, lesson) => {
      const p = getLessonProgress(lesson.id);
      acc.completedTheory += p.completedTheory;
      acc.totalTheory += p.totalTheory;
      acc.completedQuiz += p.completedQuiz;
      acc.totalQuiz += p.totalQuiz;
      acc.completed += p.completedTheory + p.completedQuiz;
      acc.total += p.totalTheory + p.totalQuiz;
      return acc;
    },
    {
      completedTheory: 0,
      totalTheory: 0,
      completedQuiz: 0,
      totalQuiz: 0,
      completed: 0,
      total: 0,
    }
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            React Basics Tutorial
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the fundamentals of React development through interactive lessons and quizzes.
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {lessons.map((lesson) => {
            if (!hydrated) {
              return (
                <Card key={lesson.id} className="animate-pulse rounded-none">
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/6"></div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            const p = getLessonProgress(lesson.id);
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completedTheory={p.completedTheory}
                totalTheory={p.totalTheory}
                completedQuiz={p.completedQuiz}
                totalQuiz={p.totalQuiz}
                completed={p.completedTheory + p.completedQuiz}
                total={p.totalTheory + p.totalQuiz}
              />
            );
          })}
        </div>

        {hydrated ? (
          <OverallProgress overall={overall} />
        ) : (
          <div className="mt-12 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-6 bg-muted rounded"></div>
              <div className="h-8 bg-muted rounded w-48"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="rounded-none">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}