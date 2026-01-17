import { TestBed } from '@angular/core/testing';

import { Plos } from './plos';

describe('Plos', () => {
  let service: Plos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
