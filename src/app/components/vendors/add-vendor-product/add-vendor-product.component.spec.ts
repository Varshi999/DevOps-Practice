import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorProductComponent } from './add-vendor-product.component';

describe('AddVendorProductComponent', () => {
  let component: AddVendorProductComponent;
  let fixture: ComponentFixture<AddVendorProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
