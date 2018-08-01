import { TestBed, inject } from '@angular/core/testing';

import { HomeApiService } from './home-api.service';

describe('HomeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeApiService]
    });
  });

  it('should be created', inject([HomeApiService], (service: HomeApiService) => {
    expect(service).toBeTruthy();
  }));
});
