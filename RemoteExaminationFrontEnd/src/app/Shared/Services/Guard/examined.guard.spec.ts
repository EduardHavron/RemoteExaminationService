import { TestBed, async, inject } from '@angular/core/testing';

import { ExaminedGuard } from './examined.guard';

describe('ExaminedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExaminedGuard]
    });
  });

  it('should ...', inject([ExaminedGuard], (guard: ExaminedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
