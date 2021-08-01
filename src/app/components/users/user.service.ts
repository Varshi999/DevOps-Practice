import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  customer_uri = 'https://test.growbaskets.com/api/admin/customers/';
  // get all the customers
  getCustomers() {
    return this.http.get(this.customer_uri).pipe(
      map((e) => {
        return e;
      })
    );
  }

  // get certain profile information
  getCustomerWithId(e: any) {
    return this.http.get(this.customer_uri + e).pipe(
      map((e) => {
        return e;
      })
    );
  }
  // update customer profile
  updateCoustomerProfile(data: any, id: any) {
    return this.http.put(this.customer_uri + id, data).pipe(
      map((e) => {
        return e;
      })
    );
  }
  // update customer password
  updateCustomerPassword(data: any, id: any) {
    return this.http
      .put(this.customer_uri + `change-password/${id}`, data)
      .pipe(
        map((e) => {
          return e;
        })
      );
  }
  //  update customer status
  updateCustomerStatus(data: any, id: any) {
    return this.http.put(this.customer_uri + `status/${id}`, data).pipe(
      map((e) => {
        return e;
      })
    );
  }
  // get all addresses
  getAddresses(id: any) {
    return this.http.get(this.customer_uri + `addresses/${id}`).pipe(
      map((e) => {
        return e;
      })
    );
  }
}
