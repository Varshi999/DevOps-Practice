import { TestBed } from '@angular/core/testing';

import { CreateVendorService } from './create-vendor.service';

describe('CreateVendorService', () => {
  let service: CreateVendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateVendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
