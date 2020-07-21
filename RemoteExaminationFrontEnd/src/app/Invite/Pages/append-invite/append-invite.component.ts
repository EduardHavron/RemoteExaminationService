import {Component, OnInit} from '@angular/core';
import {InvitationService} from '../../../Shared/Services/Invitation/invitation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-create-invite',
  templateUrl: './append-invite.component.html',
  styleUrls: ['./append-invite.component.scss']
})
export class AppendInviteComponent implements OnInit {
  examId: number;
  examName: string;
  currentAction: string;
  form: FormGroup;
  minimumInvitationCodeLength = 5;

  constructor(private invitationService: InvitationService,
              private route: ActivatedRoute,
              private examService: ExamService,
              private fb: FormBuilder,
              private toastrService: NbToastrService,
              private router: Router) {
    this.form = fb.group({
      invitationCode: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  appendInvite() {
    const inviteCode = this.form
      .value
      .invitationCode;
    if (this.validateInvitationCode(inviteCode)) {
      this.invitationService.addInviteToUser({invitationCode: inviteCode})
        .subscribe(() => {
          this.router.navigate(['/dashboard'])
            .then(() => {
              this.showToast('top-right',
                'success',
                3000,
                'Приглашение успешно применено',
                'Успех');
            });
        });
    }
  }

  private validateInvitationCode(invitationCode: string): boolean {
    if (invitationCode.trim().length >= this.minimumInvitationCodeLength) {
      return true;
    } else {

      this.showToast('top-right',
        'danger',
        3000,
        'Код приглашения должен состоять не менее чем из 5 символов, не считая пробелы',
        'Ошибка');
      return false;
    }
  }

  private showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }
}
