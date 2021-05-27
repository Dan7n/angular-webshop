import { TestBed } from '@angular/core/testing';

import { CartOperationsService } from './cart-operations.service';

describe('CartOperationsService', () => {
  let service: CartOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
