import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InvitationView} from '../../Models/Invitation/invitation-view';
import {ApplyInvitation} from '../../Models/Invitation/apply-invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private url = 'https://localhost:5001/api/Invitation/';
  constructor(private http: HttpClient) { }

  CreateInvite(invite: InvitationView) {
    return this.http.post(this.url + 'CreateInvite', invite);
  }

  AddInviteToUser(inviteCode: ApplyInvitation) {
    return this.http.post(this.url + 'AddInviteToUser', inviteCode);
  }
}
