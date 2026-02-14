import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, HelpCircle, TrendingUp } from "lucide-react";

export interface LessonProgressCardProps {
  completedTheory: number;
  totalTheory: number;
  completedQuiz: number;
  totalQuiz: number;
  progressPercentage: number;
  className?: string;
}

/**
 * A polished, reusable progress analytics card for lesson completion tracking.
 * Features animated progress bars, sub-metrics breakdown, and modern dashboard styling.
 */
export function LessonProgressCard({
  completedTheory,
  totalTheory,
  completedQuiz,
  totalQuiz,
  progressPercentage,
  className = ""
}: LessonProgressCardProps) {
  // Derived values for cleaner JSX
  const totalCompleted = completedTheory + completedQuiz;
  const totalItems = totalTheory + totalQuiz;

  return (
    <Card className={`bg-gradient-to-br from-background to-muted/20 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-none ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Overall Progress
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{totalCompleted} of {totalItems} completed</span>
          </div>
          <div
            className="w-full bg-muted h-3 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Lesson progress: ${progressPercentage}% complete`}
          >
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Sub-metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={<Book className="h-4 w-4" />}
            label="Theory"
            completed={completedTheory}
            total={totalTheory}
            colorScheme="green"
          />
          <MetricCard
            icon={<HelpCircle className="h-4 w-4" />}
            label="Quiz"
            completed={completedQuiz}
            total={totalQuiz}
            colorScheme="blue"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  completed: number;
  total: number;
  colorScheme: "green" | "blue" | "purple" | "orange";
}

function MetricCard({ icon, label, completed, total, colorScheme }: MetricCardProps) {
  const colorClasses = {
    green: {
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-100 dark:border-green-900/30",
      iconBg: "bg-green-100 dark:bg-green-900/40",
      iconColor: "text-green-600 dark:text-green-400",
      text: "text-green-800 dark:text-green-200",
      number: "text-green-600 dark:text-green-400"
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-100 dark:border-blue-900/30",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600 dark:text-blue-400",
      text: "text-blue-800 dark:text-blue-200",
      number: "text-blue-600 dark:text-blue-400"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/20",
      border: "border-purple-100 dark:border-purple-900/30",
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      iconColor: "text-purple-600 dark:text-purple-400",
      text: "text-purple-800 dark:text-purple-200",
      number: "text-purple-600 dark:text-purple-400"
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/20",
      border: "border-orange-100 dark:border-orange-900/30",
      iconBg: "bg-orange-100 dark:bg-orange-900/40",
      iconColor: "text-orange-600 dark:text-orange-400",
      text: "text-orange-800 dark:text-orange-200",
      number: "text-orange-600 dark:text-orange-400"
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className={`flex items-center gap-3 p-3 ${colors.bg} border ${colors.border} transition-all duration-200`}>
      <div className={`p-2 rounded-full ${colors.iconBg}`}>
        <div className={colors.iconColor}>
          {icon}
        </div>
      </div>
      <div>
        <div className={`text-sm font-medium ${colors.text}`}>{label}</div>
        <div className={`text-lg font-bold ${colors.number}`}>
          {completed}/{total}
        </div>
      </div>
    </div>
  );
}