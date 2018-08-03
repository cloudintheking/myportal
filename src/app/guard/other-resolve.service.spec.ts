import { TestBed, inject } from '@angular/core/testing';

import { OtherResolveService } from './other-resolve.service';

describe('OtherResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherResolveService]
    });
  });

  it('should be created', inject([OtherResolveService], (service: OtherResolveService) => {
    expect(service).toBeTruthy();
  }));
});
