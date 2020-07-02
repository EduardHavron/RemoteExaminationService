import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamResultViewComponent} from './exam-result-view.component';

describe('ExamResultViewComponent', () => {
  let component: ExamResultViewComponent;
  let fixture: ComponentFixture<ExamResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamResultViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
