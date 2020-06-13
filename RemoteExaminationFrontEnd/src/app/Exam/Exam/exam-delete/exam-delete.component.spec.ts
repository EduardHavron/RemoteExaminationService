import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDeleteComponent } from './exam-delete.component';

describe('ExamDeleteComponent', () => {
  let component: ExamDeleteComponent;
  let fixture: ComponentFixture<ExamDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
