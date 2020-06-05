import {IQuestion} from '../Question/IQuestion';
import {IAnswer} from '../Answer/IAnswer';

export interface IExam<T extends IQuestion<IAnswer>> {
name: string;
questions: Array<T>;
}
