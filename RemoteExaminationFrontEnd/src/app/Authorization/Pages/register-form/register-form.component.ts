import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Router} from '@angular/router';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';
import {NbWindowRef, NbWindowService} from '@nebular/theme';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  checked = false;
  isLoading = false;
  webcamRef: NbWindowRef;
  isCameraAllowed = false;
  documentPhoto: WebcamImage = null;
  cameraError: boolean;
  multipleWebcamsAvailable: boolean;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  @ViewChild('contentTemplate') contentTemplate: NbWindowRef;

  constructor(private fb: FormBuilder,
              private authService: AuthorizationService,
              private router: Router,
              private customToastrService: CustomToastrService,
              public translateService: TranslateService,
              private spinnerService: SpinnerService,
              private windowService: NbWindowService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  signUp() {
    const val = this.form.value;
    if (val.email && val.password && this.documentPhoto) {
      const imageAsBase64 = this.documentPhoto.imageAsDataUrl;
      this.authService.signUp({email: val.email, password: val.password, role: this.checked, passportNumber: imageAsBase64.toString()})
        .subscribe(
          () => {
            this.router.navigateByUrl('authorize/login')
              .then(() => {
                this.customToastrService.showToast('top-right',
                  'success',
                  3000,
                  this.translateService.instant('You registered successfully, now you can login to the system'),
                  this.translateService.instant('Success'));
              });
          }
        );
    }
  }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  toggleRole(checked: boolean) {
    this.checked = checked;
  }

  validatePhoto() {
    if (this.documentPhoto) {
      return this.signUp();
    }
    this.customToastrService.showToast('top-right',
      'danger',
      3000,
      this.translateService.instant('Document photo is required for registration'),
      this.translateService.instant('Error'));
  }

  allowCamera() {
    this.isCameraAllowed = true;
    // @ts-ignore
    this.webcamRef = this.windowService.open(this.contentTemplate,
      {
        title: this.translateService.instant('Taking photo'),
        closeOnBackdropClick: false,
        closeOnEsc: false
      });
  }

  retakePhoto() {
    this.documentPhoto = null;
    // @ts-ignore cause im totally sure this works well and NbWindowRef is fully compatible with TemplateRef<any>
    this.webcamRef = this.windowService.open(this.contentTemplate,
      {
        title: this.translateService.instant('Taking photo'),
        closeOnBackdropClick: false,
        closeOnEsc: false
      });
  }

  get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public handleImage(documentPhoto: WebcamImage): void {
    this.documentPhoto = documentPhoto;
    this.webcamRef.close();
    this.customToastrService.showToast('top-right',
      'success',
      3000,
      this.translateService.instant('Photo captured successfully'),
      this.translateService.instant('Success'));
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    this.cameraError = true;
    setTimeout(() => {
      this.webcamRef.close();
    }, 1000);
  }


  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
}
