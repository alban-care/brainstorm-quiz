/// <reference types="vite/client" />

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type CategoryType = {
  id: number;
  label: string;
  tag: string;
  slug: string;
  color: string;
  icon: string;
};

type QuestionType = {
  id: number;
  question: string;
  answers: AnswerType[];
};

type AnswerType = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

type ResultType = {
  category: string | undefined;
  score: number;
  questions: number;
};
