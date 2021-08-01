import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListVendorsService {

  constructor(private http: HttpClient) { }
  public url = 'https://test.growbaskets.com/api/admin';
  ngOnInit() {

  }
  getData(e:any) { 
    return this.http.get<any>(this.url + `/vendor?page=1&limit=1000&business_id=${e}`); 
  }

  getVendorDetails(uuid) {
    return this.http.get<any>(this.url + "/vendor/" + uuid);
  }

}
