import { HttpClientModule, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidators } from '../login/custom-validators'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public token;
  public forgot: FormGroup;
  public loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private activated: ActivatedRoute, private http: HttpClientModule, private authService: AuthService, private router: Router) {
    this.createLoginForm();
    // this.createRegisterForm();
  }
  ngOnInit() {
    this.activated.params.subscribe(params => {
      console.log(params.token);
      this.token = params.token;
    });
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])],
      password: ['',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])]
    })
  }
  onLogin() {
    if (this.loginForm.valid) {
      if (this.loginForm.controls.email.value === this.loginForm.controls.password.value) {
        this.authService.resetPassword(this.token, this.loginForm.controls.email.value);
        Swal.fire({
          text: 'Reset Password Successfully! ',
          icon: 'success'
        });
      }
      else {
        Swal.fire({
          text: 'New and Confirm Password doesn\'t match! ',
          icon: 'error'
        });
      }
    }
  }
}