import { Component, OnInit } from '@angular/core';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {AdminService} from '../../../Shared/Services/Admin/admin.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-get-backup',
  templateUrl: './get-backup.component.html',
  styleUrls: ['./get-backup.component.scss']
})
export class GetBackupComponent implements OnInit {

  constructor(private customToastrService: CustomToastrService,
              private adminService: AdminService,
              private translateService: TranslateService) { }

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
