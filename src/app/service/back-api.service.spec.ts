import { TestBed, inject } from '@angular/core/testing';

import { BackApiService } from './back-api.service';

describe('BackApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackApiService]
    });
  });

  it('should be created', inject([BackApiService], (service: BackApiService) => {
    expect(service).toBeTruthy();
  }));
});
