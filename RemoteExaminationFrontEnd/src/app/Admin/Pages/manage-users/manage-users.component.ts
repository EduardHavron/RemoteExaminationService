import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../Shared/Services/Admin/admin.service';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {ActivatedRoute} from '@angular/router';
import {IAdminUser} from '../../../Shared/Models/Admin/admin-user';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {TranslateService} from '@ngx-translate/core';
import {Role} from '../../../Shared/Enum/rolesEnum';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: Array<IAdminUser>;
  faTrash = faTrash;
  isLoading = false;

  constructor(private adminService: AdminService,
              private customToastrService: CustomToastrService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private spinnerService: SpinnerService) {
    activatedRoute.data.subscribe((data: { users: any }) => {
      this.users = data.users;
    });
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
  }

  deleteUser(index: number) {
    if (this.checkAdmin(index)) {
      this.adminService.deleteUser(this.users[index].userId)
        .subscribe(() => {
          this.users.splice(index, 1);
          this.customToastrService
            .showToast('top-right',
              'success',
              3000,
              this.translateService.instant('Delete User'),
              this.translateService.instant('Success'));
        });
    }
  }

  private checkAdmin(index: number): boolean {
    if (this.users[index].role === Role.Admin) {
      this.customToastrService.showToast('top-right',
        'danger',
        3000,
        this.translateService.instant('You can\'t delete admin'),
        this.translateService.instant('Error'));
      return false;
    }
    return true;
  }
}
