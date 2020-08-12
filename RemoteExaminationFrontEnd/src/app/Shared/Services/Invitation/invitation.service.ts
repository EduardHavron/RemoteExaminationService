import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IInvitation} from '../../Models/Invitation/Invitation';
import {IApplyInvitation} from '../../Models/Invitation/ApplyInvitation';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private url = environment.apiPath + 'Invitation/';

  constructor(private http: HttpClient) {
  }

  createInvite(invite: IInvitation) {
    return this.http.post(this.url + 'CreateInvite', invite, {reportProgress: true});
  }

  addInviteToUser(inviteCode: IApplyInvitation) {
    return this.http.post(this.url + 'AddInviteToUser', inviteCode);
  }
}
