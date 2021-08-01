import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CreateVendorService } from './create-vendor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-vendors',
  templateUrl: './create-vendors.component.html',
  styleUrls: ['./create-vendors.component.scss']
})
export class CreateVendorsComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  public lat;
  public lng;

  constructor(private formBuilder: FormBuilder, private createVendorApi: CreateVendorService, private auth: AuthService) {
    this.createAccountForm();
    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      commission: ['', Validators.required],
      gst_no: ['', Validators.required],
      lat: [{ value: null, disabled: true }, Validators.required],
      lng: [{ value: null, disabled: true }, Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin_code: ['', Validators.required],
      email: ['', Validators.email]
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  ngOnInit() {

  }

  public createVendor() {
    console.log("create Vendor");
    console.log(this.accountForm.getRawValue());
    if (this.accountForm.valid) {
      this.auth.createVendor(this.accountForm.value)
        .subscribe(
          (res) => {
            console.log(res.msg);
            Swal.fire({
              text: res.msg,
              icon: 'success'
            });
            // this.authService.getAuthorizationToken();
          }
        );
    }
  }

  find() {
    console.log("find");
    this.auth.getPosition().then(pos => {
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.lat = pos.lat;
      this.lng = pos.lng;
      console.log("Positon:" + this.lat);
      this.accountForm.patchValue({
        lat: pos.lat,
        lng: pos.lng
      })
      this.getaddress();
    });
  }
  getaddress() {
    this.auth.getAddress(this.lat, this.lng).subscribe(
      (res) => {
        console.log(res);
        this.accountForm.patchValue({
          city: res.city,
          state: res.state,
          country: res.country,
          pin_code: res.pin_code,
          address: res.formatted_address
        })
      }
    );
  }
}
