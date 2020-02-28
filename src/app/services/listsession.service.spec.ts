import { TestBed } from '@angular/core/testing';

import { ListsessionService } from './listsession.service';

describe('ListsessionService', () => {
  let service: ListsessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
