import { TestBed, async, inject } from '@angular/core/testing';

import { BackGuard } from './back.guard';

describe('BackGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackGuard]
    });
  });

  it('should ...', inject([BackGuard], (guard: BackGuard) => {
    expect(guard).toBeTruthy();
  }));
});
