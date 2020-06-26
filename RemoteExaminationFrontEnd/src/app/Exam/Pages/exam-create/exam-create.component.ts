import {Component, Input, OnInit} from '@angular/core';
import {NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowService} from '@nebular/theme';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {Router} from '@angular/router';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name?: string;
  isCorrect?: boolean;
  kind?: string;
  value?: string;
}

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.scss']
})

export class ExamCreateComponent implements OnInit {
  form: FormGroup;
  customColumn = 'Значение';
  defaultColumns = ['Верно ли'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<FSEntry>;
  public data: TreeNode<FSEntry>[] = [
    {
      data: { value: 'Question 1', kind: 'dir' },
      children: [
        { data: { value: 'Answer', isCorrect: true } },
        { data: { value: 'Answer2', isCorrect: false } },
      ],
    },
  ];
  private finalizedData: IExam<IQuestion<IAnswer>>;
  private questionsAndAnswers = [];
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private examService: ExamService,
              private fb: FormBuilder,
              private toastrService: NbToastrService,
              private router: Router) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }
  ngOnInit() {
  }

  finalizeData() {
    const val = this.form.value;
    let containsCorrect: boolean;
    let containsIncorrect: boolean;
    this.data.forEach(questionNode => {
      const answers = [];
      questionNode.children.forEach(answer => {
        if (answer.data.isCorrect) {
          containsCorrect = true;
        } else {
          containsIncorrect = true;
        }
        answers.push(answer.data);
      });
      if (answers.length < 2) {
        this.showToast('top-right',
          'danger',
          3000,
          'Необходим как минимум один вопрос и два ответа, один из которых должен быть правильным',
          'Ошибка');
        return true;
      }
      if (containsCorrect && containsIncorrect) {
        this.questionsAndAnswers.push({questionMessage: questionNode.data.name, answers});
      } else {
        this.showToast('top-right',
          'danger',
          3000,
          'Необходим как минимум один вопрос и два ответа, один из которых должен быть правильным',
          'Ошибка');
        return true;
      }
    });
    if (!this.validateData(val)) {
      return true;
    }
    this.addExam(val);
  }
  validateData(val): boolean {
    if (!val.name) {
      this.showToast('top-right',
        'danger',
        3000,
        'Имя экзамена обязательно к заполнению',
        'Ошибка');
      return false;
    }
    if (this.questionsAndAnswers.length < 1) {
      this.showToast('top-right',
        'danger',
        3000,
        'Необходим как минимум один вопрос и два ответа, один из которых должен быть правильным',
        'Ошибка');
      return false;
    }
    return true;
  }

  addExam(val) {
    this.finalizedData = {examId: 0, name: val.name, questions: this.questionsAndAnswers };
    console.log(this.finalizedData);
    this.examService.createExam(this.finalizedData).subscribe(() => {
      this.showToast('top-right',
        'success',
        3000,
        'Экзамен создан',
        'Успех');
      this.router.navigateByUrl('/dashboard');
    });
  }
}
