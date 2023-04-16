import { TestBed } from '@angular/core/testing';

import { ProblemsetService } from './problemset.service';

describe('ProblemsetService', () => {
  let service: ProblemsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
