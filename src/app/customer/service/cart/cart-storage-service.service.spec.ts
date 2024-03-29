import { TestBed } from '@angular/core/testing';

import { CartStorageServiceService } from './cart-storage-service.service';

describe('CartStorageServiceService', () => {
  let service: CartStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
