import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {AdminService} from '../../../Shared/Services/Admin/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAdminUser} from '../../../Shared/Models/Admin/admin-user';
import {TranslateService} from '@ngx-translate/core';
import {Role} from '../../../Shared/Enum/rolesEnum';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  form: FormGroup;
  user: IAdminUser;
  options: string[] = [Role.Admin, Role.Examined, Role.Examiner];
  faTrash = faTrash;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private customToastrService: CustomToastrService,
              private adminService: AdminService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private spinnerService: SpinnerService) {
    activatedRoute.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    });
    const {required} = Validators;
    this.form = this.fb.group({
      email: ['', required],
      password: ['', required],
      role: ['', required]
    });
    this.form.controls.email.setValue(this.user.email);
    this.form.controls.role.setValue(this.user.role);
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
  }

  updateUser() {
    const formValue = this.form.value;
    if (formValue.email && formValue.role) {
      this.adminService.updateUser({
        userId: this.user.userId,
        email: formValue.email,
        role: formValue.role,
        password: formValue.password
      })
        .subscribe(() => {
          this.customToastrService.showToast('top-right',
            'success',
            3000,
            this.translateService.instant('User updated'),
            this.translateService.instant('Success'));
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } else {
      this.customToastrService.showToast('top-right',
        'danger',
        3000,
        this.translateService.instant('Not enough data'),
        this.translateService.instant('Error'));
    }
  }

  deleteUser() {
    this.adminService.deleteUser(this.user.userId)
      .subscribe(() => {
        this.router
          .navigate(['/admin/users'])
          .then(() => {
          this.customToastrService.showToast('top-right',
            'success',
            3000,
            this.translateService.instant('Delete user'),
            this.translateService.instant('Success'));
        });
      });
  }
}
