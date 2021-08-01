import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliveryPartnersComponent } from './list-delivery-partners.component';

describe('ListDeliveryPartnersComponent', () => {
  let component: ListDeliveryPartnersComponent;
  let fixture: ComponentFixture<ListDeliveryPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeliveryPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeliveryPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
