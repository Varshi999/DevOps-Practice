import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerDataSource } from 'ng2-smart-table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  user_list: ServerDataSource;

  constructor(private userService: UserService, private router: Router,private http:HttpClient) {
    this.getCustomers();
  }

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
      customer_name: {
        title: 'Customer Name',
      },
      customer_mobile: {
        title: 'Mobile Number',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      customer_email: {
        title: 'Email',
        editable: false,
        valuePrepareFunction: (e) => {
          if (!!e) return e;
          return 'Not Assigned';
        },
      },
      customer_status: {
        title: 'Status',
        valuePrepareFunction: (e) => {
          if (e == 1) return 'Authorized';
          else return 'Unauthorized';
        },
      },
      last_logged_in: {
        title: 'Last Login',
        editable: false,
      },
      created_at: {
        title: 'Created At',
        editable: false,
      },
    },
  };

  ngOnInit() {}
  getCustomers() {
    // this.userService.getCustomers().subscribe({
    //   next: (e: any[]) => {
    //     console.log(e);
    //     this.user_list = e;
    //   },
    // });
   this.user_list = new ServerDataSource(this.http, {
      endPoint: 'https://test.growbaskets.com/api/admin/customers/',
      dataKey: 'data',
      totalKey: 'total_count',
      pagerPageKey: 'page',
      pagerLimitKey: 'limit',
    });
  }

  onSaveConfirm(event: any) {
    if (event.data.customer_name != event.newData.customer_name) {
      this.userService
        .updateCoustomerProfile(
          { name: event.newData.customer_name },
          event.data.customer_uuid
        )
        .subscribe({
          next: (e) => {
            console.log(e);
            event.confirm.resolve();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
    if (event.data.customer_status != event.newData.customer_status) {
      this.userService
        .updateCustomerStatus(
          { status: event.newData.customer_status },
          event.data.customer_uuid
        )
        .subscribe({
          next: (e) => {
            console.log(e);
            event.confirm.resolve();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  selectRow(event: any) {
    console.log(event);
    this.router.navigate(['customers/useraddress'], {
      queryParams: { user_id: event.data.customer_uuid },
    });
  }
}
