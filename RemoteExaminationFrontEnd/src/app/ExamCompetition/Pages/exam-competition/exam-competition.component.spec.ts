import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamCompetitionComponent} from './exam-competition.component';

describe('ExamCompetitionComponent', () => {
  let component: ExamCompetitionComponent;
  let fixture: ComponentFixture<ExamCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamCompetitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
