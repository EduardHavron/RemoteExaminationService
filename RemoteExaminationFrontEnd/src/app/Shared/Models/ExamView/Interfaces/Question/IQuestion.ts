import {IAnswer} from '../Answer/IAnswer';

export interface IQuestion<T extends IAnswer> {
questionMessage: string;
answers: Array<T>;
}
