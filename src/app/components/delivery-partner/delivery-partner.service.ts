import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryPartnerService {
  constructor(private http: HttpClient) {}
  dp_uri = 'https://test.growbaskets.com/api/admin/delivery_partners';
  getDpartner() {
    return this.http.get(this.dp_uri).pipe(
      map((e) => {
        return e;
      })
    );
  }
  createDp(e: any) {
    console.log(e);
    return this.http.post(this.dp_uri, e).pipe(
      map((e) => {
        return e;
      })
    );
  }
  update_status(id: any, data: any) {
    return this.http.put(this.dp_uri + `/status/${id}`, data).pipe(
      map((e) => {
        return e;
      })
    );
  }
  update_name(id: any, data: any) {
    return this.http.put(this.dp_uri + `/${id}`, data).pipe(
      map((e) => {
        return e;
      })
    );
  }
}
