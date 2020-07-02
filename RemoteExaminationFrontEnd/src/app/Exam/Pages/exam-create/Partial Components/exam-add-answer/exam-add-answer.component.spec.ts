import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAddAnswerComponent } from './exam-add-answer.component';

describe('ExamAddAnswerComponent', () => {
  let component: ExamAddAnswerComponent;
  let fixture: ComponentFixture<ExamAddAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAddAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAddAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
