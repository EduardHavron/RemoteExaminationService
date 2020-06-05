import {IQuestion} from '../../Interfaces/Question/IQuestion';
import {IAnswer} from '../../Interfaces/Answer/IAnswer';
import {ExaminedAnswer} from '../Answers/ExaminedAnswer';

export class ExaminedQuestion implements IQuestion<ExaminedAnswer> {
  questionMessage: string;
  answers: Array<ExaminedAnswer>;
}
