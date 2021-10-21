import { TestBed } from '@angular/core/testing';

import { MuroGuard } from './muro.guard';

describe('MuroGuard', () => {
  let guard: MuroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MuroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
