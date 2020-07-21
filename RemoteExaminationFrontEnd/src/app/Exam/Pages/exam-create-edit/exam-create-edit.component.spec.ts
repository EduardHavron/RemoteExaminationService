import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamCreateEditComponent} from './exam-create-edit.component';

describe('ExamCreateComponent', () => {
  let component: ExamCreateEditComponent;
  let fixture: ComponentFixture<ExamCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamCreateEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
