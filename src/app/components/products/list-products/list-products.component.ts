import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerDataSource, ViewCell } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  public products = [];
  public closeResult: string;
  public uuid;
  public id;
  public viewProduct = {
    product_id: '',
    product_name: '',
    product_uuid: '',
    product_category_id: '',
    product_brand_id: '',
    product_desc: '',
    product_rating: '',
    product_ranking: '',
    product_is_deleted: '',
    product_status: '',
    product_created_by: '',
    product_updated_by: '',
    product_created_at: '',
    product_updated_at: '',
  };
  public brandFlag = false;
  source: ServerDataSource;
  view(element, v) {
    console.log(element);
    this.auth.getProductDetails(element.data.product_uuid).subscribe((res) => {
      this.viewProduct = res;
      console.log(res);
      this.brandFlag = true;
    });
    this.modalService
      .open(v, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  constructor(
    private datePipe: DatePipe,
    private auth: AuthService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: HttpClient
  ) {

  }
  public settings = {
    actions: {
      position: 'right',
      delete: false,
    },
    pager: {
      display:true
    },
    columns: {
      product_name: {
        title: 'Product Name',
      },
      product_uuid: {
        title: 'Product UUID',
      },
      product_rating: {
        title: 'Product Rating',
      },
      product_created_at: {
        title: 'Product Created At',
      },
    },
    hideSubHeader: true,
    mode: 'external',
  };
  ngOnInit() {
    console.log(this.onStart());
    this.onStart();
    this.productsearch
      .get('searchValue')
      .valueChanges.subscribe((selectedValue) => {
        // console.log(selectedValue);
        if (selectedValue === '') {
          this.onStart();
        } else {
          this.searchProduct();
        }
      });
  }
  onStart() {
    this.source = new ServerDataSource(this.http, {
      endPoint: 'https://test.growbaskets.com/api/admin/products',
      dataKey: 'data',
      totalKey: 'total_count',
      pagerPageKey:"page",
      pagerLimitKey:"limit"
    });
  }
  // edit(element, content) {
  //   console.log(element);
  //   this.uuid = element.data.vendor_uuid;
  //   this.service.getVendorDetails(element.data.vendor_uuid).subscribe(res => {
  //     console.log(res);
  //     this.vendorForm.setValue({
  //       name: res.vendor_name,
  //       commission: res.vendor_commission,
  //       gst_no: res.vendor_gst_no,
  //       address: res.vendor_address,
  //       lat: res.vendor_lat,
  //       lng: res.vendor_lng,
  //       city: res.vendor_city,
  //       state: res.vendor_state,
  //       pin_code: res.vendor_pin_code,
  //       country: res.vendor_country
  //     })
  //   })
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  productedit = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    brand_id: ['', Validators.required],
  });
  productsearch = this.fb.group({
    searchValue: ['', Validators.required],
  });
  edit(element, content) {
    console.log(element);
    this.id = element.data.product_uuid;
    this.auth.getProductEdit(element.data.product_uuid).subscribe((res) => {
      console.log(res);
      this.productedit.setValue({
        name: res.product_name,
        description: res.product_desc,
        category_id: res.product_category_id,
        brand_id: res.product_brand_id,
      });
    });
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  updateProduct() {
    this.auth
      .updateProduct(
        this.productedit.value.name,
        this.productedit.value.description,
        this.productedit.value.category_id,
        this.productedit.value.brand_id,
        this.id
      )
      .subscribe((res) => {
        console.log(res.msg);
        this.modalService.dismissAll();
        this.onStart();
      });
  }

  searchProduct() {
    // console.log(this.productsearch.value.searchValue.l)
        this.auth
          .searchProduct(this.productsearch.value.searchValue)
          .subscribe((res) => {
            console.log(res);
            this.source = res;
          });

  }

  limtchange(event: any) {
    console.log(event.target.value);
  }
}
