import {Component, OnInit} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {faCheck, faPlus, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create-edit.component.html',
  styleUrls: ['./exam-create-edit.component.scss']
})

export class ExamCreateEditComponent implements OnInit {
  minimalInputLength = 1;
  isEdit: boolean;
  examNameForm: FormGroup;
  examQuestionForm: FormGroup;
  faPlus = faPlus;
  faCheck = faCheck;
  faSave = faSave;
  faTrash = faTrash;
  exam: IExam<IQuestion<IAnswer>>;

  constructor(private examService: ExamService,
              private toastrService: NbToastrService,
              private router: Router,
              private fb: FormBuilder,
              route: ActivatedRoute) {
    if (route.snapshot.params.examId) {
      route.data.subscribe((data: { exam: any }) => {
        this.exam = data.exam;
      });
      this.isEdit = true;
    } else {
      this.initializeNewExam();
      this.isEdit = false;
    }
    this.initializeForms(fb);
  }

  private initializeNewExam() {
    this.exam = {
      examId: 0,
      name: '',
      questions: [],
    };
  }

  private initializeForms(fb) {
    this.examNameForm = fb
        .group({
          examName: ['', Validators.required]
        });
    if (this.isEdit) {
      this.examNameForm
          .controls
          .examName
          .setValue(this.exam.name);
    }

    this.examQuestionForm = fb
        .group({
          examQuestion: ['', Validators.required]
        });
  }

  private showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
        message,
        title,
        {preventDuplicates: true, position, status, duration});
  }

  ngOnInit() {
  }

  addAnswer(event) {
    this.showAnswerInput(event);
  }

  addQuestion() {
    this.showQuestionInput();
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.exam.questions[0].answers
        .splice(answerIndex, 1);
  }

  removeQuestion(questionIndex: number) {
    this.exam.questions
        .splice(questionIndex, 1);
  }

  createExam() {
    if (this.validateExam()) {
      if (this.isEdit) {
        this.updateExam();
      } else {
        this.examService.createExam(this.exam).subscribe(() => {
          this.router.navigate(['/dashboard'])
              .then(() => {
                this.showToast('top-right',
                    'success',
                    3000,
                    'Экзамен успешно создан',
                    'Успех');
              });
        });
      }
    }
  }

  updateExam() {
    this.examService.editExam(this.exam).subscribe(() => {
      this.router.navigate(['/dashboard'])
          .then(() => {
            this.showToast('top-right',
                'success',
                3000,
                'Экзамен успешно обновлен',
                'Успех');
          });
    });
  }

  validateAnswer(answer: string): boolean {
    return answer
        .trim()
        .length >= this.minimalInputLength;
  }

  validateQuestion(question: string): boolean {
    return question
        .trim()
        .length >= this.minimalInputLength;
  }

  validateExamName(examName: string): boolean {
    if (examName.trim().length >= 1) {
      return true;
    } else {
      this.showToast('top-right',
          'danger',
          3000,
          'Название экзамена не может быть пустым',
          'Ошибка');
      return false;
    }
  }

  validateExamLength(): boolean {
    if (this.exam.questions.length < 1) {
      this.showToast('top-right',
          'danger',
          3000,
          'В экзамене должен быть хотя бы один вопрос',
          'Ошибка');
      return false;
    } else {
      return true;
    }
  }

  validateExamQuestions(): boolean {
    let finalResult = false;
    for (const question of this.exam.questions) {
      let containsTrue = false;
      let containsFalse = false;
      question.answers.forEach(answer => {
        if (answer.isCorrect) {
          containsTrue = true;
        } else {
          containsFalse = true;
        }
      });
      if (containsTrue && containsFalse) {
        finalResult = true;
      } else {
        this.showToast('top-right',
            'danger',
            3000,
            'Каждый вопрос должен содержать не менее одного правильного и одного неправильного ответа',
            'Ошибка');
        finalResult = false;
        break;
      }
    }
    return finalResult;
  }

  validateExam(): boolean {
    const examName = this.examNameForm
        .value
        .examName;
    if (!this.validateExamName(examName)) {
      return false;
    }
    this.exam.name = examName;
    if (!this.validateExamLength()) {
      return false;
    }
    return this.validateExamQuestions();
  }

  saveAnswer(questionIndex: number, event) {
    const answer = this.getAnswerData(event);
    if (this.validateAnswer(answer.value)) {
      this.exam
          .questions[questionIndex]
          .answers
          .push(answer);
      this.clearAnswerInput(event);
      this.showAnswerInitial(event);
    } else {
      this.showToast('top-right',
          'danger',
          3000,
          'В ответе должно быть не меньше 5 символов',
          'Ошибка');
    }
  }

  saveQuestion() {
    const val = this.examQuestionForm
        .value
        .examQuestion;
    if (this.validateQuestion(val)) {
      this.exam.questions
          .push({questionMessage: val, answers: []});
      this.showQuestionInitial();
      this.examQuestionForm.reset();
    } else {
      this.showToast('top-right',
          'danger',
          3000,
          'В вопросе должно быть не меньше 5 символов',
          'Ошибка');
    }
  }

  showAnswerInput(event) {
    const parentBlock = $(event.path[0])
        .parents('nb-list-item')
        .first();
    const hiddenBlock = parentBlock
        .find('.show-answer')
        .first();
    const showedBlock = parentBlock
        .find('.save-answer')
        .first();

    hiddenBlock
        .addClass('hide');
    showedBlock
        .removeClass('hide');
  }

  showAnswerInitial(event) {
    const parentBlock = $(event.path[0])
        .parents('nb-list-item')
        .first();
    const hiddenBlock = parentBlock
        .find('.show-answer')
        .first();
    const showedBlock = parentBlock
        .find('.save-answer')
        .first();

    hiddenBlock
        .removeClass('hide');
    showedBlock
        .addClass('hide');
  }

  showQuestionInput() {
    $('#add-question-block').addClass('hide');
    $('#save-question-block').removeClass('hide');
  }

  showQuestionInitial() {
    $('#add-question-block').removeClass('hide');
    $('#save-question-block').addClass('hide');
  }

  clearAnswerInput(event) {
    const parentBlock = $(event.path[0])
        .parents('nb-list-item')
        .first();
    const showedBlock = parentBlock
        .find('.save-answer')
        .first();
    showedBlock
        .find(':input')
        .first()
        .val('');
    showedBlock
        .find('nb-checkbox')
        .first()
        .prop('checked', false);
  }

  getAnswerData(event): IAnswer {
    const parentBlock = $(event.path[0])
        .parents('nb-list-item')
        .first();
    const showedBlock = parentBlock
        .find('.save-answer')
        .first();
    const answerValue = showedBlock
        .find(':input')
        .first()
        .val()
        .toString();
    const isCorrectValue = showedBlock
        .find('input[type=\'checkbox\']')
        .first()
        .is(':checked');
    return {value: answerValue, isCorrect: isCorrectValue};
  }
}
