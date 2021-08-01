import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url = 'https://test.growbaskets.com/api/admin';
  public loc = 'https://test.growbaskets.com/api/store-front/geocoding';
  constructor(private http: HttpClient, private router: Router) {}
  login(data): Observable<any> {
    return this.http
      .post<any>(this.url + '/login', data)
      .pipe(catchError(this.handleError));
  }
  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getCategoryName(id) {
    return this.http.get<any>(this.url + '/category/' + id);
  }

  getProductEdit(id) {
    return this.http.get<any>(this.url + '/product/' + id);
  }
  getBrandName(id) {
    return this.http.get<any>(this.url + '/brand/' + id);
  }
  getCategory() {
    return this.http.get<any>(
      'https://test.growbaskets.com/api/admin/categories/all'
    );
  }
  getBrand() {
    return this.http.get<any>('https://test.growbaskets.com/api/admin/brands');
  }
  getAddress(lat, lng): Observable<any> {
    var body = { lat: lat, lng: lng };
    return this.http
      .post<any>(this.loc, body)
      .pipe(catchError(this.handleError));
  }
  forgot(data): Observable<any> {
    return this.http
      .post<any>(this.url + '/forgot-password', data)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  public setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('token', authResult.token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logout() {
    // let headers = { 'token': this.getToken() };
    this.http.delete<any>(this.url + '/logout').subscribe((data) => {
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    });
  }
  getUserData() {
    // let headers = { 'token': this.getToken() };
    return this.http.get<any>(this.url + '/profile');
  }
  resetPassword(token, pass) {
    let data = { reset_token: token, password: pass };
    this.http.put<any>(this.url + '/reset-password', data).subscribe((data) => {
      console.log('password reset done.');
      this.router.navigate(['/auth/login']);
    });
  }
  createVendor(data): Observable<any> {
    return this.http
      .post<any>(this.url + '/vendor', data)
      .pipe(catchError(this.handleError));
  }
  createProduct(data): Observable<any> {
    return this.http
      .post<any>(this.url + '/product', data)
      .pipe(catchError(this.handleError));
  }
  updateVendor(data, uuid): Observable<any> {
    return this.http
      .put<any>(this.url + '/vendor/' + uuid, data)
      .pipe(catchError(this.handleError));
  }
  updateCategory(data, id) {
    var dat = { name: data };
    return this.http
      .put<any>(this.url + '/category/' + id, dat)
      .pipe(catchError(this.handleError));
  }
  updateBrand(data, id) {
    var dat = { name: data };
    return this.http
      .put<any>(this.url + '/brand/' + id, dat)
      .pipe(catchError(this.handleError));
  }

  updateProduct(d, des, cat, br, id) {
    var dat = { name: d, description: des, category_id: cat, brand_id: br };
    return this.http
      .put<any>(this.url + '/product/' + id, dat)
      .pipe(catchError(this.handleError));
  }
  addCategory(na) {
    var name = { name: na };
    return this.http
      .post<any>(this.url + '/category/', name)
      .pipe(catchError(this.handleError));
  }
  addBrand(na, cat) {
    var nam = { name: na, category_id: cat };
    return this.http
      .post<any>(this.url + '/brand/', nam)
      .pipe(catchError(this.handleError));
  }

  getBrandDetails(id) {
    return this.http
      .get<any>(this.url + '/brand/' + id)
      .pipe(catchError(this.handleError));
  }

  getProductDetails(id) {
    return this.http
      .get<any>(this.url + '/product/' + id)
      .pipe(catchError(this.handleError));
  }

  getCategoryDetails(id) {
    return this.http
      .get<any>(this.url + '/category/' + id)
      .pipe(map(e=>{return e}));
  }

  getVendorDetails(id) {
    return this.http
      .get<any>(this.url + '/vendor/' + id)
      .pipe(catchError(this.handleError));
  }
  getProduct() {
    return this.http.get<any>(
      'https://test.growbaskets.com/api/admin/products?page=2&limit=1000'
    );
  }

  searchProduct(value) {
    return this.http.get<any>(
      this.url + '/products/search?q=' + value
    );
  }
  getVendorProducts(uuid) {
    return this.http.get<any>(this.url + '/vendor/products/' + uuid);
  }

  addVendorProduct(uuid, data) {
    return this.http
      .post<any>(this.url + '/vendor/products/' + uuid, data)
      .pipe(catchError(this.handleError));
  }

  updateVendorProduct(uuid, data) {
    return this.http
      .put<any>(this.url + '/vendor/products/' + uuid, data)
      .pipe(catchError(this.handleError));
  }
}
