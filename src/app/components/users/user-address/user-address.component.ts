import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  add_list = [];
  user_id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}
  public settings = {
    actions: {
      position: 'right',
      delete: false,
      add: false,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      address_id: {
        title: 'Address Id',
      },
      formatted_address: {
        title: 'Formatted Address',
        editable: false,
      },
      street_number: {
        title: 'Street',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      landmark: {
        title: 'Landmark',
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      mobile_no: {
        title: 'Mobile',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      pin_code: {
        title: 'Pin Code',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      city: {
        title: 'City',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      state: {
        title: 'State',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      country: {
        title: 'Country',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      address_label: {
        title: 'Address Lable',
        editable: false,
      },
      status: {
        title: 'Status',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e == 1) return 'Authorized';
          else return 'Unauthorized';
        },
      },
      is_deleted: {
        title: 'Address Vaild',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e == 1) return 'Invalid';
          else return 'Valid';
        },
      },
      is_default: {
        title: 'Default',
        editable: false,
        valuePrepareFunction: (e) => {
          if (e == 1) return 'Yes';
          else return 'No';
        },
      },
    },
  };
  ngOnInit(): void {
    this.user_id = this.activatedRoute.snapshot.queryParams['user_id'];
    this.getAddress(this.user_id);
  }
  getAddress(e: any) {
    this.userService.getAddresses(e).subscribe({
      next: (e: any[]) => {
        console.log(e);
        this.add_list = e;
      },
    });
  }
  onSaveConfirm(e) {}
}
