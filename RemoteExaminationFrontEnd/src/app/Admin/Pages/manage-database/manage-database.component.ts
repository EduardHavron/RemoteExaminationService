import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {AdminService} from '../../../Shared/Services/Admin/admin.service';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-manage-database',
  templateUrl: './manage-database.component.html',
  styleUrls: ['./manage-database.component.scss']
})
export class ManageDatabaseComponent implements OnInit {
  form: FormGroup;
  affectedRows: number;
  isAccepted = new BehaviorSubject(false);
  modalRef: NbDialogRef<any>;
  prohibitedWords = ['DROP', 'TRUNCATE', 'DELETE'];

  constructor(private dialogService: NbDialogService,
              private fb: FormBuilder,
              private adminService: AdminService,
              private customToastrService: CustomToastrService,
              private translateService: TranslateService) {
    this.form = this.fb.group({
      query: ['', Validators.required]
    });
    this.isAccepted.subscribe(value => {
      if (value === true) {
        this.executeQuery();
        this.isAccepted.next(false);
      }
    });
  }

  ngOnInit() {
  }

  checkQuery(dialog: TemplateRef<any>) {
    const query = this.form.value.query.split(' ');
    const uppercaseQuery = query.map(x => x.toUpperCase());
    const found = this.prohibitedWords.some(r => uppercaseQuery.includes(r));
    if (found) {
      this.openDialog(dialog);
    }
  }

  private openDialog(dialog: TemplateRef<any>) {
    this.modalRef = this.dialogService.open(dialog,
      {closeOnBackdropClick: false, hasBackdrop: true, closeOnEsc: false});
  }

  public setAccepted(value: boolean) {
    this.isAccepted.next(value);
    this.modalRef.close();
  }

  private executeQuery() {
    this.adminService.executeQuery({query: this.form.value.query})
      .subscribe((result) => {
        this.affectedRows = parseInt(String(result), 10);
        this.customToastrService.showToast(
          'top-right',
          'success',
          3000,
          this.translateService.instant('SQL Executed'),
          this.translateService.instant('Success')
        );
      });
  }
}
