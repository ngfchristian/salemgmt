import { TestBed } from '@angular/core/testing';

import { DeliveryserviceService } from './deliveryservice.service';

describe('DeliveryserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryserviceService = TestBed.get(DeliveryserviceService);
    expect(service).toBeTruthy();
  });
});
