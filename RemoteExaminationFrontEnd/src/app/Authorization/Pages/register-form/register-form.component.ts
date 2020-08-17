import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Router} from '@angular/router';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';
import {NbWindowRef, NbWindowService} from '@nebular/theme';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {WebcamWidth} from '../../../Shared/Models/Webcam/webcam-width';

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
  webcamWidth: BehaviorSubject<number>;
  webcamHeight: BehaviorSubject<number>;
  private changeSize = new Subject<WebcamWidth>();
  isCameraAllowed = false;
  documentPhoto: WebcamImage = null;
  cameraError: boolean;
  multipleWebcamsAvailable: boolean;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
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
    this.changeSize
      .asObservable()
      .subscribe((data) => this.calculateWebcamSize(data));
  }

  signUp() {
    const val = this.form.value;
    if (val.email && val.password && this.documentPhoto) {
      const imageAsBase64 = this.documentPhoto.imageAsDataUrl;
      this.authService.signUp({email: val.email, password: val.password, role: this.checked, passportHash: imageAsBase64.toString()})
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

  allowCamera(window: TemplateRef<any>) {
    this.isCameraAllowed = true;
    this.initWebcamSize();
    this.webcamRef = this.windowService.open(window,
      {
        title: this.translateService.instant('Taking photo'),
        closeOnBackdropClick: false,
        closeOnEsc: false
      });
  }

  retakePhoto(window: TemplateRef<any>) {
    this.documentPhoto = null;
    this.webcamRef = this.windowService.open(window,
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

  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.changeSize.next({width: target.innerWidth, height: target.innerHeight});
  }

  private initWebcamSize() {
    const height = window.innerHeight * 0.4;
    const width = window.innerWidth * 0.4;
    if (width > 500 || height > 375) {
      this.webcamWidth = new BehaviorSubject<number>(500);
      this.webcamWidth = new BehaviorSubject<number>(375);
    }
    if (width < 225 || height < 150) {
      this.webcamWidth = new BehaviorSubject<number>(225);
      this.webcamHeight = new BehaviorSubject<number>(150);
    } else {
      this.webcamWidth = new BehaviorSubject<number>(width);
      this.webcamHeight = new BehaviorSubject<number>(height);
    }
  }
  private calculateWebcamSize(args: WebcamWidth) {
    const height = args.height * 0.4;
    const width = args.width * 0.4;
    if (width > 500 || height > 375) {
      this.webcamWidth.next(500);
      this.webcamHeight.next(375);
      return;
    }
    if (width < 225 || height < 150) {
      this.webcamWidth.next(225);
      this.webcamHeight.next(150);
    } else {
      this.webcamWidth.next(width);
      this.webcamHeight.next(height);
    }
  }
}
