import { Component, OnInit } from '@angular/core';
import { vendorsDB } from '../../../shared/tables/vendor-list';
import { UiSwitchToggleComponent } from '../ui-switch-toggle/ui-switch-toggle.component';
import { ListVendorsService } from './list-vendors.service';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-vendors',
  templateUrl: './list-vendors.component.html',
  styleUrls: ['./list-vendors.component.css']
})
export class ListVendorsComponent implements OnInit {
  public closeResult: string;
  public business_id:any;
  public uuid;


  public viewVendor = {
    vendor_id: '', vendor_name: '', vendor_uuid: '', vendor_commission: '', vendor_gst_no: '',
    vendor_address_1: '', vendor_address_2: '', vendor_lat: '', vendor_lng: '', vendor_city: '',
    vendor_state: '', vendor_pin_code: '', vendor_country: '', vendor_status: '',
    vendor_stop_orders: '', vendor_closed: '', vendor_rating: '', vendor_ranking: '',
    vendor_created_by: '', vendor_updated_by: '', vendor_created_at: '', vendor_updated_at: ''
  };
  public brandFlag = false;


  vendorForm = this.fb.group({
    name: [''],
    commission: [''],
    gst_no: [''],
    address: [''],
    lat: [''],
    lng: [''],
    city: [''],
    state: [''],
    pin_code: [''],
    country: [''],
  });
  vendors: ServerDataSource;
  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute,private service: ListVendorsService, private datePipe: DatePipe, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder) {
  }
  public settings = {
    actions: {
      position: 'right',
      delete: false
    },
    columns: {
      vendor_name: {
        title: 'Vendor Name'
      },
      vendor_commission: {
        title: 'Commission',
        valuePrepareFunction: (comm) => {
          return comm + "%";
        },
      },
      vendor_status: {
        title: 'Vendor Status',
        type: 'custom',
        renderComponent: UiSwitchToggleComponent
      },
      vendor_stop_orders: {
        title: 'Vendor Stop Orders',
        type: 'custom',
        renderComponent: UiSwitchToggleComponent
      },
      vendor_closed: {
        title: 'Vendor Closed',
        type: 'custom',
        renderComponent: UiSwitchToggleComponent
      },
      vendor_created_at: {
        title: 'Vendor Created At',
        valuePrepareFunction: (vendor_created_at) => {
          var raw = new Date(vendor_created_at);
          var formatted = new DatePipe('en-EN').transform(raw, 'dd MMM yyyy hh:mm');
          return formatted;
        },
      }
    },
    hideSubHeader: true,
    mode: 'external'
  };
  ngOnInit() {
     this.business_id=this.activatedRoute.snapshot.queryParams["business_id"]
    this.onStart(this.business_id);
  }
  onStart(e:any) {
    // this.service.getData(e).subscribe(res => {
    //   console.log(res);
    //   this.vendors = res;
    // })
    this.vendors=new ServerDataSource(this.http, {
      endPoint: `https://test.growbaskets.com/api/admin/vendor?business_id=${e}`,
      dataKey: 'data',
      totalKey: 'total_count',
      pagerPageKey: 'page',
      pagerLimitKey: 'limit',
    });
  }
  edit(element:any, content:any) {
    console.log(element);
    this.uuid = element.data.vendor_uuid;
    this.service.getVendorDetails(element.data.vendor_uuid).subscribe(res => {
      console.log(res);
      this.vendorForm.setValue({
        name: res.vendor_name,
        commission: res.vendor_commission,
        gst_no: res.vendor_gst_no,
        address: res.vendor_address,
        lat: res.vendor_lat,
        lng: res.vendor_lng,
        city: res.vendor_city,
        state: res.vendor_state,
        pin_code: res.vendor_pin_code,
        country: res.vendor_country
      })
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  createVendor() {
    console.log(this.vendorForm.getRawValue());
    if (this.vendorForm.valid) {
      this.auth.updateVendor(this.vendorForm.value, this.uuid)
        .subscribe(
          (res) => {
            console.log(res.msg);
            this.modalService.dismissAll();
            this.onStart(this.business_id);
          }
        );
    }
  }
  view(element:any, v:any) {
    console.log(element);
    this.auth.getVendorDetails(element.data.vendor_uuid).subscribe(res => {
      this.viewVendor = res;
      console.log(res);
      this.brandFlag = true;
    })
    this.modalService.open(v, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}