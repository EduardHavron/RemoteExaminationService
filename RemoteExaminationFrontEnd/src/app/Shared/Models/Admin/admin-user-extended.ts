import {IAdminUser} from './admin-user';

export interface IUserExtended extends IAdminUser {
  password: string;
}
