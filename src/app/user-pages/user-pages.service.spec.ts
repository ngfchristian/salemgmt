import { TestBed } from '@angular/core/testing';

import { UserPagesService } from './user-pages.service';

describe('UserPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPagesService = TestBed.get(UserPagesService);
    expect(service).toBeTruthy();
  });
});
