import {ExaminerAnswer} from '../Answer/examiner-answer';

export interface ExaminerQuestion {
QuestionMessage: string;
Answers: Array<ExaminerAnswer>;
}
