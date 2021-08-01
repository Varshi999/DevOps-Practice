import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSwitchToggleComponent } from './ui-switch-toggle.component';

describe('UiSwitchToggleComponent', () => {
  let component: UiSwitchToggleComponent;
  let fixture: ComponentFixture<UiSwitchToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiSwitchToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSwitchToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
