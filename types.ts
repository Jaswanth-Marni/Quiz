export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>; // questionId -> optionId
  isFinished: boolean;
  hasStarted: boolean;
}