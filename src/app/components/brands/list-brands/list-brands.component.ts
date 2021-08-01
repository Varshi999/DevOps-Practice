import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerDataSource, ViewCell } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit {
  public closeResult: string;
  public id;
  public viewBrand = { brand_id: '', brand_name: '', brand_category_id: '', brand_img: '', brand_created_at: '', brand_created_by: '', brand_updated_at: '', brand_updated_by: '' };
  public brandFlag = false;

  brandedit = this.fb.group({
    name: ['', Validators.required]
  });
  brandadd = this.fb.group({
    name: ['', Validators.required],
    cat_id: ['', Validators.required]
  });
  brands: any;
  constructor(private datePipe: DatePipe,private http:HttpClient, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder) {
  }
  open(content) {
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

  public settings = {
    actions: {
      position: 'right',
      add: true,
      delete: false
    },
    columns: {
      brand_id: {
        title: 'Brand ID'
      },
      brand_name: {
        title: 'Brand Name'
      },
      brand_img: {
        title: 'Brand Image',
        type: 'html'
      },
      brand_category_id: {
        title: 'Brand Category Id'
      },
      brand_created_at: {
        title: 'Brand Created At',
        valuePrepareFunction: (brand_created_at) => {
          var raw = new Date(brand_created_at);
          var formatted = new DatePipe('en-EN').transform(raw, 'dd MMM yyyy hh:mm');
          return formatted;
        }
      }
    },
    hideSubHeader: true,
    mode: 'external',
    setPaging: 10
  };
  ngOnInit(): void {
    this.onStart();
  }

  onStart() {
    // this.auth.getBrand().subscribe(res => {
    //   console.log(res);
    //   this.brands = res;
    //   this.brands.forEach(a => {
    //     a["brand_img"] = "<img src = '" + a['brand_img'] + "' width=50px; height=50px; />";
    //     a["button"] = "View";
    //   })
    // })
this.brands=new ServerDataSource(this.http, {
      endPoint: `https://test.growbaskets.com/api/admin/brands`,
      dataKey: 'data',
      totalKey: 'total_count',
      pagerPageKey: 'page',
      pagerLimitKey: 'limit',
    });
  }
  edit(element, content) {
    console.log(element);
    this.brandedit.setValue({
      name: ''
    });
    this.id = element.data.brand_id;
    this.auth.getBrandName(element.data.brand_id).subscribe(res => {
      console.log(res);
      this.brandedit.setValue({
        name: res.brand_name
      })
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateName() {
    this.auth.updateBrand(this.brandedit.value.name, this.id).subscribe(
      (res) => {
        console.log(res.msg);
        this.modalService.dismissAll();
        this.onStart();
      }
    );
  }
  addBrand() {
    console.log(this.brandadd.value.name)
    this.auth.addBrand(this.brandadd.value.name, this.brandadd.value.cat_id).subscribe(
      (res) => {
        console.log(res.msg);
        this.modalService.dismissAll();
        this.onStart();
        Swal.fire({
          text: res.msg,
          icon: 'success'
        });
      }
    );
  }
  view(element, v) {
    console.log(element);
    this.auth.getBrandDetails(element.data.brand_id).subscribe(res => {
      this.viewBrand = res;
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

@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  @ViewChild(ListBrandsComponent, { static: false }) buttonParent: ListBrandsComponent;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    console.log(this.buttonParent);
    this.save.emit(this.rowData);
    this.buttonParent.view(this.rowData, 'viewbrand');
  }
}