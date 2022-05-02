import { TestBed } from '@angular/core/testing';

import { MarsServiceService } from './mars-service.service';

describe('MarsServiceService', () => {
  let service: MarsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
