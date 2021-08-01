import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http:HttpClient) { }
  business_uri="https://test.growbaskets.com/api/admin/business";
  getBusinesses(){
    return this.http.get(this.business_uri).pipe(
      map(e=>{
        return e
      })
    )
  }
}
