import { TestBed } from '@angular/core/testing';

import { ComplexityParserService } from './complexity-parser.service';

describe('ComplexityParserService', () => {
  let service: ComplexityParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexityParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
