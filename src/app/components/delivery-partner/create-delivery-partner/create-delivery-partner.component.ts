import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryPartnerService } from '../delivery-partner.service';
@Component({
  selector: 'app-create-delivery-partner',
  templateUrl: './create-delivery-partner.component.html',
  styleUrls: ['./create-delivery-partner.component.scss'],
})
export class CreateDeliveryPartnerComponent implements OnInit {
  public accountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dps: DeliveryPartnerService,
    private router: Router
  ) {
    this.createAccountForm();
  }

  ngOnInit(): void {}
  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile: ['', Validators.required],
      driving_license: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      rc_no: ['', Validators.required],
      vehicle_no: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.accountForm.valid) {
      this.dps.createDp(this.accountForm.value).subscribe({
        next: (e) => {
          console.log(e), this.router.navigate(['/deliverypartners']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      console.log('invalid form');
    }
  }
}
