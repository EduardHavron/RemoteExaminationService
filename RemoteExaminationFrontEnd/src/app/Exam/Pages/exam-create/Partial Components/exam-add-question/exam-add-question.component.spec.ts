import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamAddQuestionComponent} from './exam-add-question.component';

describe('ExamAddQuestionComponent', () => {
  let component: ExamAddQuestionComponent;
  let fixture: ComponentFixture<ExamAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamAddQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
