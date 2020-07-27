import {IExamResultAnswer} from './exam-result-answer';

export interface IExamResultQuestion {
  examResultQuestionId: number;
  examResultAnswers: Array<IExamResultAnswer>;
  question: string;
}
