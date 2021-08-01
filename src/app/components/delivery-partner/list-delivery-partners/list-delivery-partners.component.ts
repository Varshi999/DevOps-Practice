import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryPartnerService } from '../delivery-partner.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-delivery-partners',
  templateUrl: './list-delivery-partners.component.html',
  styleUrls: ['./list-delivery-partners.component.scss'],
})
export class ListDeliveryPartnersComponent implements OnInit {
  closeResult: string;
  partners: ServerDataSource;
  constructor(
    private formBuilder: FormBuilder,
    private dps: DeliveryPartnerService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    this.createAccountForm();
  }
  public updateForm: FormGroup;
  ngOnInit(): void {
    this.getDpartners();
    console.log(this.partners);

  }
  createAccountForm() {
    this.updateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile: ['', Validators.required],
      driving_license: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      rc_no: ['', Validators.required],
      vehicle_no: ['', Validators.required],
      user_uuid: [''],
    });
  }
  updateDP() {
    const data = this.updateForm.value;
    console.log(data);
    this.dps.update_name(data.user_uuid, data).subscribe({
      next: (e) => {
        console.log(e);
        this.getDpartners();
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  public settings = {
    actions: {
      position: 'right',
      delete: false,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      user_first_name: {
        title: 'First Name',
      },
      user_last_name: {
        title: 'Last Name',
      },
      user_mobile: {
        title: 'Mobile Number',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e) return e;
          return 'Not Assigned';
        },
      },
      driving_license: {
        title: 'Driving License',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e) return e;
          return 'Not Assigned';
        },
      },
      aadhar_no: {
        title: 'Aadhaar',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e) return e;
          return 'Not Assigned';
        },
      },
      rc_no: {
        title: 'RC Number',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e) return e;
          return 'Not Assigned';
        },
      },
      user_status: {
        title: 'Status',
        valuePrepareFunction: (e) => {
          if (e == 1) return 'Approved';
          return 'Not Approved';
        },
      },
      last_logged_in: {
        title: 'Last Login',
        editable: false,
        valuePrepareFunction: (created_at) => {
          var raw = new Date(created_at);
          var formatted = new DatePipe('en-EN').transform(
            raw,
            'dd MMM yyyy hh:mm'
          );
          return formatted;
        },
      },
      created_at: {
        title: 'Created At',
        editable: false,
        valuePrepareFunction: (created_at) => {
          var raw = new Date(created_at);
          var formatted = new DatePipe('en-EN').transform(
            raw,
            'dd MMM yyyy hh:mm'
          );
          return formatted;
        },
      },
    },
    hideSubHeader: true,
    mode: 'external',
  };
  getDpartners() {
    // this.dps.getDpartner().subscribe({
    //   next: (e) => {
    //     this.partners = e['data'];
    //     console.log(e);
    //   },
    // });
    this.partners = new ServerDataSource(this.http, {
      endPoint: 'https://test.growbaskets.com/api/admin/delivery_partners',
      dataKey: 'data',
      totalKey: 'total_count',
      pagerPageKey: 'page',
      pagerLimitKey: 'limit',
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
  onSaveConfirm(event: any, contentModel) {
    console.log();

    this.updateForm = this.formBuilder.group({
      first_name: [event.data.user_first_name, Validators.required],
      last_name: [event.data.user_last_name, Validators.required],
      user_uuid: [event.data.user_uuid],
      rc_no: [event.data.rc_no, Validators.required],
      vehicle_no: [event.data.vehicle_no, Validators.required],
      driving_license: [event.data.driving_license, Validators.required],
      aadhar_no: [event.data.aadhar_no, Validators.required],
    });
    this.modalService
      .open(contentModel, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // onSaveConfirm(event: any) {
  //   if (event.data.user_name != event.newData.user_name) {
  //     this.dps
  //       .update_name(event.data.user_uuid, { name: event.newData.user_name })
  //       .subscribe({
  //         next: (e) => {
  //           console.log(e);
  //           event.confirm.resolve();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         },
  //       });
  //   }
  //   if (event.data.user_status != event.newData.user_status) {
  //     this.dps
  //       .update_status(event.data.user_uuid, {
  //         status: event.newData.user_status,
  //       })
  //       .subscribe({
  //         next: (e) => {
  //           console.log(e);
  //           event.confirm.resolve();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         },
  //       });
  //   }
  //   event.confirm.resolve();
  // }
  selectDp(e: any) {}
}
