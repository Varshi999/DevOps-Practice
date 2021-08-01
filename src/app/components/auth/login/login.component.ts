import {
  HttpClientModule,
  HttpHeaders,
  HttpInterceptor,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidators } from './custom-validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public forgot: FormGroup;
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientModule,
    private authService: AuthService,
    private router: Router
  ) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    {
      title: 'Welcome to Grow Baskets',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: 'Welcome to Grow Baskets',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: 'Welcome to Grow Baskets',
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createRegisterForm() {
    this.forgot = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  onForgot() {
    if (this.forgot.valid) {
      this.authService.forgot(this.forgot.value).subscribe((res) => {
        console.log('Email Sent');
        Swal.fire({
          text: 'Forgot Password Mail Sent! ',
          icon: 'success',
        });
        // this.authService.setSession(res);

        // this.authService.getAuthorizationToken();
      });
    }
  }
  ngOnInit() {}
  onLogin() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.user_name);
          this.authService.setSession(res);
          this.router.navigateByUrl('/');
          // this.authService.getAuthorizationToken();

          this.authService.getUserData().subscribe((data) => {
            // console.log();
            Swal.fire({
              text: 'Welcome! ' + data.user_name,
              icon: 'success',
            });
            //  data.user_name;
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
    }
  }
}
