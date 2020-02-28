import { TestBed } from '@angular/core/testing';

import { ListoperationService } from './listoperation.service';

describe('ListoperationService', () => {
  let service: ListoperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListoperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
