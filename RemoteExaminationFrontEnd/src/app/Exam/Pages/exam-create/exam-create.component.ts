import {Component, OnInit} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';


@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.scss']
})

export class ExamCreateComponent implements OnInit {
  faPlus = faPlus;
  faCheck = faCheck;

  examNameForm: FormGroup;
  exam: IExam<IQuestion<IAnswer>>;

  constructor(private examService: ExamService,
              private fb: FormBuilder,
              private toastrService: NbToastrService) {
    this.examNameForm = this.fb.group({
      examName: ['', Validators.required]
    });
  }

  showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }

  ngOnInit() {
    this.examService.getExamById(1).subscribe((data) => {
      this.exam = data;
    });
  }
}
