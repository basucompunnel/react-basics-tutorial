'use client'

interface ProgressCardProps {
  title: string;
  icon: React.ReactNode;
  completed: number;
  total: number;
  className?: string;
}

function ProgressCard({ title, icon, completed, total, className }: ProgressCardProps) {
  return (
    <Card className={`w-full flex flex-col items-center p-6 rounded-none ${className ?? ''}`}>
      {icon}
      <div className="text-lg font-bold mb-1">{title}</div>
      <div className="text-2xl font-semibold">{completed} / {total}</div>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
      <ProgressCard
        title="Theory Progress"
        icon={<Book className="h-8 w-8 text-blue-500 mb-2" />}
        completed={overall.completedTheory}
        total={overall.totalTheory}
        className="bg-blue-100 dark:bg-blue-900"
      />
      <ProgressCard
        title="Quiz Progress"
        icon={<HelpCircle className="h-8 w-8 text-yellow-500 mb-2" />}
        completed={overall.completedQuiz}
        total={overall.totalQuiz}
        className="bg-yellow-100 dark:bg-yellow-900"
      />
      <ProgressCard
        title="Total Progress"
        icon={<CheckCircle className="h-8 w-8 text-green-500 mb-2" />}
        completed={overall.completed}
        total={overall.total}
        className="bg-green-100 dark:bg-green-900"
      />
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { lessons } from "@/lib/lessons";
import { Book, HelpCircle, CheckCircle } from "lucide-react";
import { useProgressStore } from "@/store/progressStore";

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    content: { id: number; title: string }[];
  };
  completedTheory: number;
  totalTheory: number;
  completedQuiz: number;
  totalQuiz: number;
  completed: number;
  total: number;
}

function LessonCard({ lesson, completedTheory, totalTheory, completedQuiz, totalQuiz, completed, total }: LessonCardProps) {
  return (
    <Card className="w-full rounded-none shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 h-96 p-0">
      <CardHeader className="bg-blue-100 dark:bg-blue-900">
        <CardTitle className="text-2xl bg-blue-100 dark:bg-blue-900 rounded-none p-2 pt-4">{lesson.title}</CardTitle>
      </CardHeader>
      <div className="flex flex-row h-full items-start">
        <div className="flex flex-col w-4/5 items-start justify-center">
          <CardContent className="pt-0 flex-1 w-full">
            <ul className="space-y-2">
              {lesson.content.map((item) => (
                <li key={item.id} className="text-lg">
                  • {item.title}
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
        <CardFooter className="flex flex-col items-center justify-start w-1/5 gap-6 mt-2">
          <div className="flex flex-col items-center">
            <Book className="h-5 w-5 text-blue-500 mb-1" />
            <span className="font-semibold">{completedTheory}/{totalTheory}</span>
          </div>
          <div className="flex flex-col items-center">
            <HelpCircle className="h-5 w-5 text-yellow-500 mb-1" />
            <span className="font-semibold">{completedQuiz}/{totalQuiz}</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
            <span className="font-semibold">{completed}/{total}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default function Home() {
  const progress = useProgressStore((state) => state.progress);
  // Calculate overall progress
  const overall = lessons.reduce(
    (acc, lesson) => {
      const p = progress[lesson.id] || {
        completedTheory: 0,
        totalTheory: 0,
        completedQuiz: 0,
        totalQuiz: 0,
        completed: 0,
        total: 0,
      };
      acc.completedTheory += p.completedTheory;
      acc.totalTheory += p.totalTheory;
      acc.completedQuiz += p.completedQuiz;
      acc.totalQuiz += p.totalQuiz;
      acc.completed += p.completed;
      acc.total += p.total;
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
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const p = progress[lesson.id] || {
              completedTheory: 0,
              totalTheory: 0,
              completedQuiz: 0,
              totalQuiz: 0,
              completed: 0,
              total: 0,
            };
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completedTheory={p.completedTheory}
                totalTheory={p.totalTheory}
                completedQuiz={p.completedQuiz}
                totalQuiz={p.totalQuiz}
                completed={p.completed}
                total={p.total}
              />
            );
          })}
        </div>
        <OverallProgress overall={overall} />
      </div>
    </div>
  );
}