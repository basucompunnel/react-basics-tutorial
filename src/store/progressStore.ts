import { create } from "zustand";
import { persist } from "zustand/middleware";
import { lessons } from "@/lib/lessons";

interface ProgressState {
  progress: {
    [lessonId: number]: {
      completedTheory: number;
      totalTheory: number;
      completedQuiz: number;
      totalQuiz: number;
      completed: number;
      total: number;
    };
  };
  setProgress: (
    lessonId: number,
    values: {
      completedTheory?: number;
      totalTheory?: number;
      completedQuiz?: number;
      totalQuiz?: number;
      completed?: number;
      total?: number;
    }
  ) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist<ProgressState>(
    (set) => ({
      progress: {
        1: { completedTheory: 0, totalTheory: 7, completedQuiz: 0, totalQuiz: 7, completed: 0, total: 14 },
        2: { completedTheory: 0, totalTheory: 6, completedQuiz: 0, totalQuiz: 6, completed: 0, total: 12 },
        3: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
        4: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
        5: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
        6: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
        7: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
        8: { completedTheory: 0, totalTheory: 4, completedQuiz: 0, totalQuiz: 4, completed: 0, total: 8 },
        9: { completedTheory: 0, totalTheory: 4, completedQuiz: 0, totalQuiz: 4, completed: 0, total: 8 },
        10: { completedTheory: 0, totalTheory: 4, completedQuiz: 0, totalQuiz: 4, completed: 0, total: 8 },
        11: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
        12: { completedTheory: 0, totalTheory: 5, completedQuiz: 0, totalQuiz: 5, completed: 0, total: 10 },
      },
      setProgress: (lessonId, values) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              ...values,
            },
          },
        })),
    }),
    {
      name: "progress-storage",
    }
  )
);
