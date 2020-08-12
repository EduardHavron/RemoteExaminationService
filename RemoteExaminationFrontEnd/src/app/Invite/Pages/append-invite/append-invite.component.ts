import {Component, OnInit} from '@angular/core';
import {InvitationService} from '../../../Shared/Services/Invitation/invitation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';

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
  isLoading = false;

  constructor(private invitationService: InvitationService,
              private route: ActivatedRoute,
              private examService: ExamService,
              private fb: FormBuilder,
              private customToastrService: CustomToastrService,
              private router: Router,
              private translateService: TranslateService,
              private spinnerService: SpinnerService) {
    this.form = fb.group({
      invitationCode: ['', Validators.required]
    });
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
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
              this.customToastrService.showToast('top-right',
                'success',
                3000,
                this.translateService.instant('Invite successfully applied'),
                this.translateService.instant('Success'));
            });
        });
    }
  }

  private validateInvitationCode(invitationCode: string): boolean {
    if (invitationCode.trim().length >= this.minimumInvitationCodeLength) {
      return true;
    } else {

      this.customToastrService.showToast('top-right',
        'danger',
        3000,
        this.translateService.instant('Invite code should contain at least 5 symbols without spaces'),
        this.translateService.instant('Error'));
      return false;
    }
  }

}
