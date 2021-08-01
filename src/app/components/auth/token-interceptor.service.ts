import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private route: Router, private auth: AuthService) { }
  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    const token = authService.getToken();
    let newHeaders = req.headers;
    // console.log(req.params.get("test"));
    newHeaders.append('Content-Type', 'application/json');
    if (token) {
      newHeaders = newHeaders.append('token', token);
    }
    const authReq = req.clone({ headers: newHeaders });
    // console.log(authReq);
    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        console.error(error.error.msg);
        let n = error.error.msg;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
          console.log(error.error.message);
          Swal.fire(n, 'errror');
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 401) {
            console.log(error.status);
            localStorage.removeItem('token');
            this.route.navigate(['/auth/login']);
          }
          Swal.fire(error.error.msg, 'Something went Wrong!', 'error');
        }
        return throwError(errorMessage);

      })
    );
  }
}
