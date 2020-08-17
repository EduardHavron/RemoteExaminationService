import {Component, OnInit} from '@angular/core';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {AdminService} from '../../../Shared/Services/Admin/admin.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';

@Component({
  selector: 'app-get-backup',
  templateUrl: './get-backup.component.html',
  styleUrls: ['./get-backup.component.scss']
})
export class GetBackupComponent implements OnInit {
  isLoading = false;

  constructor(private customToastrService: CustomToastrService,
              private adminService: AdminService,
              private translateService: TranslateService,
              private spinnerService: SpinnerService) {
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
  }

  getBackup() {
    this.adminService.getBackupFile();
    this.customToastrService.showToast('top-right',
      'success',
      3000,
      this.translateService.instant('Successfully generated and downloaded backup'),
      this.translateService.instant('Success'));
  }
}
