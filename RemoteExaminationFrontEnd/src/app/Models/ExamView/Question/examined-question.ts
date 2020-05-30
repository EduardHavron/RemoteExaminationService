import {ExaminedAnswer} from '../Answer/examined-answer';

export interface ExaminedQuestion {
QuestionMessage: string;
Answers: Array<ExaminedAnswer>;
}
