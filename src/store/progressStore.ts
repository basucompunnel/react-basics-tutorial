import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContentProgress {
  theoryCompleted: boolean;
  quizCompleted: boolean;
  completedAt?: Date;
}

interface LessonProgress {
  contents: Record<string, ContentProgress>;
}

interface ProgressState {
  progress: Record<number, LessonProgress>;
  hydrated: boolean;

  // Actions
  markTheoryComplete: (lessonId: number, contentSlug: string) => void;
  markQuizComplete: (lessonId: number, contentSlug: string) => void;
  resetLessonProgress: (lessonId: number) => void;
  setHydrated: () => void;

  // Selectors
  getLessonProgress: (lessonId: number) => {
    completedTheory: number;
    totalTheory: number;
    completedQuiz: number;
    totalQuiz: number;
    progressPercentage: number;
  };
  getContentProgress: (lessonId: number, contentSlug: string) => ContentProgress | null;
}

const initialProgress: Record<number, LessonProgress> = {
  1: {
    contents: {
      "const-let": { theoryCompleted: false, quizCompleted: false },
      "arrow-functions": { theoryCompleted: false, quizCompleted: false },
      "destructuring": { theoryCompleted: false, quizCompleted: false },
      "spread-operator": { theoryCompleted: false, quizCompleted: false },
      "array-methods-map-filter": { theoryCompleted: false, quizCompleted: false },
      "import-export": { theoryCompleted: false, quizCompleted: false },
      "template-literals": { theoryCompleted: false, quizCompleted: false },
    },
  },
  2: {
    contents: {
      "types-vs-interfaces": { theoryCompleted: false, quizCompleted: false },
      "typing-props": { theoryCompleted: false, quizCompleted: false },
      "typing-state": { theoryCompleted: false, quizCompleted: false },
      "union-types": { theoryCompleted: false, quizCompleted: false },
      "optional-props": { theoryCompleted: false, quizCompleted: false },
      "react-fc": { theoryCompleted: false, quizCompleted: false },
    },
  },
  3: {
    contents: {
      "jsx-rules": { theoryCompleted: false, quizCompleted: false },
      "expressions-vs-statements": { theoryCompleted: false, quizCompleted: false },
      "conditional-rendering": { theoryCompleted: false, quizCompleted: false },
      "lists-keys": { theoryCompleted: false, quizCompleted: false },
      "fragments": { theoryCompleted: false, quizCompleted: false },
    },
  },
  4: {
    contents: {
      "what-a-component-really-is": { theoryCompleted: false, quizCompleted: false },
      "props": { theoryCompleted: false, quizCompleted: false },
      "reusability": { theoryCompleted: false, quizCompleted: false },
      "composition": { theoryCompleted: false, quizCompleted: false },
      "default-props-patterns": { theoryCompleted: false, quizCompleted: false },
    },
  },
  5: {
    contents: {
      "class-syntax": { theoryCompleted: false, quizCompleted: false },
      "render": { theoryCompleted: false, quizCompleted: false },
      "this-props-this-state": { theoryCompleted: false, quizCompleted: false },
      "lifecycle-overview": { theoryCompleted: false, quizCompleted: false },
      "why-functional-components-replaced-them": { theoryCompleted: false, quizCompleted: false },
    },
  },
  6: {
    contents: {
      "use-state": { theoryCompleted: false, quizCompleted: false },
      "event-handling": { theoryCompleted: false, quizCompleted: false },
      "controlled-inputs": { theoryCompleted: false, quizCompleted: false },
      "updating-state-correctly": { theoryCompleted: false, quizCompleted: false },
      "state-immutability": { theoryCompleted: false, quizCompleted: false },
    },
  },
  7: {
    contents: {
      "use-effect": { theoryCompleted: false, quizCompleted: false },
      "dependency-array-rules": { theoryCompleted: false, quizCompleted: false },
      "cleanup-functions": { theoryCompleted: false, quizCompleted: false },
      "common-infinite-loop-mistakes": { theoryCompleted: false, quizCompleted: false },
      "mapping-to-class-lifecycle-methods": { theoryCompleted: false, quizCompleted: false },
    },
  },
  8: {
    contents: {
      "data-flow": { theoryCompleted: false, quizCompleted: false },
      "lifting-state-up": { theoryCompleted: false, quizCompleted: false },
      "when-not-to-use-state": { theoryCompleted: false, quizCompleted: false },
      "derived-state-anti-patterns": { theoryCompleted: false, quizCompleted: false },
    },
  },
  9: {
    contents: {
      "conditional-rendering-patterns": { theoryCompleted: false, quizCompleted: false },
      "dynamic-classes": { theoryCompleted: false, quizCompleted: false },
      "rendering-based-on-permissions": { theoryCompleted: false, quizCompleted: false },
      "feature-flags-intro-level": { theoryCompleted: false, quizCompleted: false },
    },
  },
  10: {
    contents: {
      "controlled-vs-uncontrolled": { theoryCompleted: false, quizCompleted: false },
      "handling-multiple-inputs": { theoryCompleted: false, quizCompleted: false },
      "validation-basics": { theoryCompleted: false, quizCompleted: false },
      "submission-flow": { theoryCompleted: false, quizCompleted: false },
    },
  },
  11: {
    contents: {
      "use-ref": { theoryCompleted: false, quizCompleted: false },
      "when-refs-are-necessary": { theoryCompleted: false, quizCompleted: false },
      "focusing-inputs": { theoryCompleted: false, quizCompleted: false },
      "measuring-dom": { theoryCompleted: false, quizCompleted: false },
      "what-not-to-do-with-refs": { theoryCompleted: false, quizCompleted: false },
    },
  },
  12: {
    contents: {
      "reusable-components": { theoryCompleted: false, quizCompleted: false },
      "props-design": { theoryCompleted: false, quizCompleted: false },
      "folder-structure": { theoryCompleted: false, quizCompleted: false },
      "presentational-vs-container-components": { theoryCompleted: false, quizCompleted: false },
      "when-to-split-components": { theoryCompleted: false, quizCompleted: false },
    },
  },
};

export const useProgressStore = create<ProgressState>()(
  persist<ProgressState>(
    (set, get) => ({
      progress: initialProgress,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      markTheoryComplete: (lessonId, contentSlug) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              contents: {
                ...state.progress[lessonId].contents,
                [contentSlug]: {
                  ...state.progress[lessonId].contents[contentSlug],
                  theoryCompleted: true,
                  completedAt: new Date(),
                },
              },
            },
          },
        })),

      markQuizComplete: (lessonId, contentSlug) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              ...state.progress[lessonId],
              contents: {
                ...state.progress[lessonId].contents,
                [contentSlug]: {
                  ...state.progress[lessonId].contents[contentSlug],
                  quizCompleted: true,
                  completedAt: new Date(),
                },
              },
            },
          },
        })),

      resetLessonProgress: (lessonId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: {
              contents: Object.keys(state.progress[lessonId].contents).reduce(
                (acc, slug) => ({
                  ...acc,
                  [slug]: { theoryCompleted: false, quizCompleted: false },
                }),
                {} as Record<string, ContentProgress>
              ),
            },
          },
        })),

      getLessonProgress: (lessonId) => {
        const lesson = get().progress[lessonId];
        if (!lesson) {
          return { completedTheory: 0, totalTheory: 0, completedQuiz: 0, totalQuiz: 0, progressPercentage: 0 };
        }

        const contents = Object.values(lesson.contents);
        const completedTheory = contents.filter((c) => c.theoryCompleted).length;
        const completedQuiz = contents.filter((c) => c.quizCompleted).length;
        const totalTheory = contents.length;
        const totalQuiz = contents.length;
        const totalItems = totalTheory + totalQuiz;
        const completedItems = completedTheory + completedQuiz;
        const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        return { completedTheory, totalTheory, completedQuiz, totalQuiz, progressPercentage };
      },

      getContentProgress: (lessonId, contentSlug) => {
        const lesson = get().progress[lessonId];
        return lesson?.contents[contentSlug] || null;
      },
    }),
    {
      name: "progress-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
