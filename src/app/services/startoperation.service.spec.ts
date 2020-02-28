import { TestBed } from '@angular/core/testing';

import { StartoperationService } from './startoperation.service';

describe('StartoperationService', () => {
  let service: StartoperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartoperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
