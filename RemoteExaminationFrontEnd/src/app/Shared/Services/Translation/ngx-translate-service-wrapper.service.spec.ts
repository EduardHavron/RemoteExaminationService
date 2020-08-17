import {TestBed} from '@angular/core/testing';

import {NgxTranslateServiceWrapperService} from './ngx-translate-service-wrapper.service';

describe('NgxTranslateServiceWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTranslateServiceWrapperService = TestBed.get(NgxTranslateServiceWrapperService);
    expect(service).toBeTruthy();
  });
});
