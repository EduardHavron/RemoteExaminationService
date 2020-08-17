import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {IUser} from '../../../Shared/Models/UserAuth/IUser';
import {faEdit, faTrash, faVoteYea} from '@fortawesome/free-solid-svg-icons';
import {IQuestion} from '../../../Shared/Models/ExamView/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Exam/IExam';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';
import {NbDialogRef, NbDialogService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ExamCompetitionService} from '../../../Shared/Services/ExamCompetition/exam-competition.service';
import {Router} from '@angular/router';
import {WebcamWidth} from '../../../Shared/Models/Webcam/webcam-width';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: IUser;
  ExamList: Array<IExam<IQuestion<IAnswer>>>;
  faTrash = faTrash;
  faEdit = faEdit;
  faVoteYea = faVoteYea;
  isLoading = false;
  webcamRef: NbWindowRef;
  webcamWidth: BehaviorSubject<number>;
  webcamHeight: BehaviorSubject<number>;
  modalRef: NbDialogRef<any>;
  isCameraAllowed = false;
  documentPhoto: BehaviorSubject<WebcamImage> = new BehaviorSubject<WebcamImage>(null);
  cameraError: boolean;
  multipleWebcamsAvailable: boolean;
  private changeSize = new Subject<WebcamWidth>();
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(private examService: ExamService,
              private authenticationService: AuthorizationService,
              private customToastrService: CustomToastrService,
              private translateService: TranslateService,
              private spinnerService: SpinnerService,
              private windowService: NbWindowService,
              private dialogService: NbDialogService,
              private examCompetitionService: ExamCompetitionService,
              private router: Router) {
    this.initSubscriptions();
  }

  get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  ngOnInit(): void {
    this.getExams();
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    const cameraAllowed = localStorage.getItem('acceptedCamera');
    if (cameraAllowed) {
      this.isCameraAllowed = true;
    }
  }

  initSubscriptions() {
    this.authenticationService.currentUserSubject.subscribe(x => this.currentUser = x);
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
    this.changeSize
      .asObservable()
      .subscribe((data) => this.calculateWebcamSize(data));
  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(data => {
        this.ExamList = data;
      });
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin;
  }

  isExaminer(): boolean {
    return this.authenticationService.isExaminer;
  }

  isExamined(): boolean {
    return this.authenticationService.isExamined;
  }

  deleteExam(examId: number, examPos: number) {
    this.examService.deleteExam(examId).subscribe(() => {
      this.customToastrService.showToast('top-right',
        'success',
        1600,
        this.translateService.instant('Exam is deleted'),
        this.translateService.instant('Success'));
      this.removeExamFromPage(examPos);
    });
  }

  removeExamFromPage(examPos: number) {
    this.ExamList.splice(examPos, 1);
  }

  public handleImage(documentPhoto: WebcamImage): void {
    this.documentPhoto.next(documentPhoto);
    this.webcamRef.close();
    this.customToastrService.showToast('top-right',
      'success',
      3000,
      this.translateService.instant('Photo captured successfully'),
      this.translateService.instant('Success'));
  }

  public handleInitError(error: WebcamInitError): void {
    this.cameraError = true;
    setTimeout(() => {
      this.webcamRef.close();
    }, 1000);
  }


  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public triggerSnapshot(examId: number): void {
    this.trigger.next();

    this.getAccessToExam(examId);
  }

  startExam(examId: number, webcamRef: TemplateRef<any>, dialogRef: TemplateRef<any>) {
    if (this.isAdmin()) {
      this.getAccessToExam(examId);
      return;
    }
    if (this.isCameraAllowed) {
      this.initWebcamSize();
      // @ts-ignore i don't know how to fix this alert, but it works :(
      this.webcamRef = this.windowService.open(webcamRef,
        {
          title: this.translateService.instant('Taking photo'),
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {examIdValue: examId}
        });
    } else {
      this.modalRef = this.dialogService.open(dialogRef,
        {
          closeOnBackdropClick: false,
          closeOnEsc: false,
        });
    }
  }

  setAccepted(accepted: boolean) {
    if (accepted) {
      localStorage.setItem('acceptedCamera', 'true');
      this.isCameraAllowed = true;
      this.modalRef.close();
    } else {
      this.modalRef.close();
    }
  }

  getAccessToExam(examId: number) {
    if (this.isAdmin()) {
      this.navigateToExam(examId);
    } else {
      const imageAsBase64 = this.documentPhoto.getValue().imageAsDataUrl;
      this.examCompetitionService.recognizeData({passportImageBase64: imageAsBase64})
        .subscribe((data) => {
          if (data.status === 200) {
            localStorage.setItem(examId.toString(10), 'approved');
            this.navigateToExam(examId);
          } else {
            this.customToastrService.showToast('top-right',
              'danger',
              3000,
              this.translateService.instant('Access to exam denied'),
              this.translateService.instant('Error'));
          }
        });
    }
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

  private navigateToExam(examId) {
    this.router.navigate(['/competition/' + examId + '/competition'])
      .then(() => {
        this.customToastrService.showToast('top-right',
          'success',
          5000,
          this.translateService.instant('Access to exam approved'),
          this.translateService.instant('Success'));
      });
  }
}

/* Create localStorage item which will mark acess to exam and implement
 onDestroy on exam competition and clean token on it and submit row data with bool flag*/
