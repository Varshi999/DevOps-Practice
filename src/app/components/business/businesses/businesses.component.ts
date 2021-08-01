import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.scss']
})
export class BusinessesComponent implements OnInit {
  businesses: ServerDataSource;
  constructor(private businessService:BusinessService,private http:HttpClient, private datePipe: DatePipe, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder,private router:Router) {
  }
  public settings = {
    actions: false,
    columns: {
      business_id: {
        title: 'Business Id',
      },
      business_name: {
        title: 'Business Name'
      },
      gst_no: {
        title: 'GSTIN'
      },
      pan_no: {
        title: 'PAN',
      },
      business_mobile_no: {
        title: 'Mobile',
      },

      created_at: {
        title: 'Vendor Created At',
        valuePrepareFunction: (created_at) => {
          var raw = new Date(created_at);
          var formatted = new DatePipe('en-EN').transform(raw, 'dd MMM yyyy hh:mm');
          return formatted;
        },
      }
    },
    hideSubHeader: true,
    mode: 'external'
  };
  ngOnInit(): void {
    this.getBusinesses();
  }
  getBusinesses(){
    // this.businessService.getBusinesses().subscribe({
    //   next: e =>{
    //     this.businesses = e;
    //     console.log(this.businesses)
    //   }
    // })
   this.businesses= new ServerDataSource(this.http, {
      endPoint: `https://test.growbaskets.com/api/admin/business`,
      dataKey: 'data',
      totalKey: 'total_count',
      pagerPageKey: 'page',
      pagerLimitKey: 'limit',
    });
  }
  getVendors(e:any){
    this.router.navigate(["vendors/list-vendors"],{queryParams:{business_id:e.data.business_id}})
  }
}
