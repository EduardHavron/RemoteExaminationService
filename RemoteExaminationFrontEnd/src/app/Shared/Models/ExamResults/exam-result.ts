import {IExamResultQuestion} from './exam-result-question';

export interface IExamResult {
  examId: number;
  examResultQuestions: Array<IExamResultQuestion>;
  examResultDate: string;
  examResultInPercent: string;
  userEmail: string;
}
