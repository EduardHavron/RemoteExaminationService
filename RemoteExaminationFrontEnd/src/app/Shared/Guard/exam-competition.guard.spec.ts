import {inject, TestBed} from '@angular/core/testing';

import {ExamCompetitionGuard} from './exam-competition.guard';

describe('ExamCompetitionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamCompetitionGuard]
    });
  });

  it('should ...', inject([ExamCompetitionGuard], (guard: ExamCompetitionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
