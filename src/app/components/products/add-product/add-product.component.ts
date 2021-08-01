import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public createProduct: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.createProductForm();
  }
  createProductForm() {
    this.createProduct = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      cat_id: ['', Validators.required],
      brand_id: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }
  create() {
    if (this.createProduct.valid) {
      this.auth.createProduct(this.createProduct.value)
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
}
