import {Component, OnInit} from '@angular/core';
import {faCopy as fasCopy} from '@fortawesome/free-regular-svg-icons/faCopy';
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {InvitationService} from '../../../Shared/Services/Invitation/invitation.service';
import {CustomToastrService} from '../../../Shared/Services/NbToastr/custom-toastr.service';

@Component({
  selector: 'app-generate-invite',
  templateUrl: './generate-invite.component.html',
  styleUrls: ['./generate-invite.component.scss']
})
export class GenerateInviteComponent implements OnInit {
  faCopy = fasCopy;
  inviteCode: string;
  examId: number;

  constructor(private customToastrService: CustomToastrService,
              private router: Router,
              private invitationService: InvitationService,
              private activatedRoute: ActivatedRoute) {
    this.inviteCode = this.newCode;
    this.examId = parseInt(activatedRoute.snapshot.params.examId, 10);
  }

  ngOnInit() {
    this.invitationService.createInvite(
      {examId: this.examId, invitationCode: this.inviteCode})
      .subscribe(() => {
        this.customToastrService.showToast('top-right',
          'success',
          3000,
          'Код приглашения создан',
          'Успех');
      });
  }

  get newCode() {
    return uuidv4();
  }

  copyCode() {
    navigator.clipboard.writeText(this.inviteCode).then(() => {
      this.customToastrService.showToast('top-right',
        'success',
        3000,
        'Скопировано в буфер обмена',
        'Успех');
    });
  }

}
