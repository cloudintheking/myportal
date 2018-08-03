import { TestBed, inject } from '@angular/core/testing';

import { HomeResolveService } from './home-resolve.service';

describe('HomeResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeResolveService]
    });
  });

  it('should be created', inject([HomeResolveService], (service: HomeResolveService) => {
    expect(service).toBeTruthy();
  }));
});
