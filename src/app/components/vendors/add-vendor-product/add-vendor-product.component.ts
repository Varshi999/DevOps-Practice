import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-vendor-product',
  templateUrl: './add-vendor-product.component.html',
  styleUrls: ['./add-vendor-product.component.scss']
})
export class AddVendorProductComponent implements OnInit {
  public products = [];
  public closeResult: string;
  public uuid;
  public id;
  public viewProduct = {
    product_id: '', product_name: '', product_uuid: '', product_category_id: '',
    product_brand_id: '', product_desc: '',
    product_rating: '', product_ranking: '', product_is_deleted: '', product_status: '', product_created_by: '',
    product_updated_by: '', product_created_at: '', product_updated_at: ''
  };
  public brandFlag = false;
  view(element, v) {
    console.log(element);
    this.auth.getProductDetails(element.data.product_uuid).subscribe(res => {
      this.viewProduct = res;
      console.log(res);
      this.brandFlag = true;
    })
    this.modalService.open(v, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  constructor(private datePipe: DatePipe, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute) {
  }
  public settings = {
    actions: {
      position: 'right',
      delete: false,
      hide: true
    },
    columns: {
      product_name: {
        title: 'Product Name'
      },
      product_uuid: {
        title: 'Product UUID'
      },
      product_rating: {
        title: 'Product Rating'
      },
      product_created_at: {
        title: 'Product Created At'
      }
    },
    hideSubHeader: true,
    mode: 'external',
  };
  ngOnInit() {
    this.onStart();
    this.productsearch.get("searchValue").valueChanges.subscribe(selectedValue => {
      // console.log(selectedValue);
      if (selectedValue === "") {
        this.onStart();
      }
      else {
        this.searchProduct();
      }
    });
    this.route.paramMap.subscribe(params => {
      this.uuid = params.get('uuid');
    })
  }
  onStart() {
    this.auth.getProduct().subscribe(res => {
      console.log(res);
      this.products = res;
    })
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
  product_name;
  product_id;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  productsearch = this.fb.group({
    searchValue: ['', Validators.required]
  });
  productprice = this.fb.group({
    actualPrice: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
    sellingPrice: ['', [Validators.required, Validators.pattern(this.numberRegEx)]]
  });
  edit(element, content) {
    console.log(element);
    this.id = element.data.product_uuid;
    this.auth.getProductEdit(element.data.product_uuid).subscribe(res => {
      console.log(res);
      this.product_name = res.product_name;
      this.product_id = res.product_id;
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateProduct() {
    var data = { product_id: this.product_id, actual_price: this.productprice.value.actualPrice, selling_price: this.productprice.value.sellingPrice }
    this.auth.addVendorProduct(this.uuid, data).subscribe((res) => {
      console.log(res);
    })
  }

  searchProduct() {
    this.auth.searchProduct(this.productsearch.value.searchValue).subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }
}
