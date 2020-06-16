import {IQuestion} from '../Question/IQuestion';
import {IAnswer} from '../Answer/IAnswer';

export interface IExam<T extends IQuestion<IAnswer>> {
examId: number;
name: string;
questions: Array<T>;
}
