import {TestBed} from '@angular/core/testing';

import {ExamCompetitionService} from './exam-competition.service';

describe('ExamCompetitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamCompetitionService = TestBed.get(ExamCompetitionService);
    expect(service).toBeTruthy();
  });
});
