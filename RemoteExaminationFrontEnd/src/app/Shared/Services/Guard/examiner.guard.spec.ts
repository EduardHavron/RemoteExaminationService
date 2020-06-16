import { TestBed, async, inject } from '@angular/core/testing';

import { ExaminerGuard } from './examiner.guard';

describe('ExaminerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExaminerGuard]
    });
  });

  it('should ...', inject([ExaminerGuard], (guard: ExaminerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
