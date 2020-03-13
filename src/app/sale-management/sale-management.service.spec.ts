import { TestBed } from '@angular/core/testing';

import { SaleManagementService } from './sale-management.service';

describe('SaleManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleManagementService = TestBed.get(SaleManagementService);
    expect(service).toBeTruthy();
  });
});
