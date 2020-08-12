import {Component, OnInit} from '@angular/core';
import {IQuestion} from '../../../Shared/Models/ExamView/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Exam/IExam';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomToastrService} from '../../../Shared/Services/CustomToastr/custom-toastr.service';
import {ExamCompetitionService} from '../../../Shared/Services/ExamCompetition/exam-competition.service';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';

@Component({
  selector: 'app-exam-competition',
  templateUrl: './exam-competition.component.html',
  styleUrls: ['./exam-competition.component.scss']
})
export class ExamCompetitionComponent implements OnInit {
  exam: IExam<IQuestion<IAnswer>>;
  isLoading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customToastrService: CustomToastrService,
              private examCompetitionService: ExamCompetitionService,
              private translateService: TranslateService,
              private spinnerService: SpinnerService) {
    route.data.subscribe((data: { exam: any }) => {
      data.exam.questions = this.shuffleExam(data.exam.questions);
      this.exam = data.exam;
    });
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
  }

  sendResult() {
    this.examCompetitionService.sendResult(this.exam)
      .subscribe(() => {
        this.router.navigate(['/dashboard'])
          .then(() => {
            this.customToastrService.showToast('top-right',
              'success',
              3000,
              this.translateService.instant('Result sent'),
              this.translateService.instant('Success'));
          });
      });
  }

  touchAnswer(questionIndex: number, answerIndex: number) {
    this.exam.questions[questionIndex]
      .answers[answerIndex].isCorrect = !this.exam.questions[questionIndex]
      .answers[answerIndex].isCorrect; // shitty code?
  }

  private shuffleExam(questions: Array<IQuestion<IAnswer>>) {
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        answer.isCorrect = false;
      });
      question.answers.sort(() => Math.random() - 0.5);
    });
    questions.sort(() => Math.random() - 0.5);
    return questions;
  }
}
