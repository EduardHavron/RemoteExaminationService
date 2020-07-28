import {IExamResultQuestion} from './exam-result-question';

export interface IExamResult {
  examResultId: number;
  examId: number;
  examName: string;
  examResultQuestions: Array<IExamResultQuestion>;
  examResultDate: string;
  examResultInPercent: string;
  userEmail: string;
}
