import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewCell } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { UiSwitchToggleComponent } from '../ui-switch-toggle/ui-switch-toggle.component';

@Component({
  selector: 'app-vendor-product-list',
  templateUrl: './vendor-product-list.component.html',
  styleUrls: ['./vendor-product-list.component.scss']
})
export class VendorProductListComponent implements OnInit {
  uuid;
  checked: boolean;
  public vendorProduct = [];
  public closeResult: string;
  productedit = this.fb.group({
    vendor_product_id: ['', Validators.required],
    product_name: ['', Validators.required],
    actual_price: ['', Validators.required],
    selling_price: ['', Validators.required],
    in_stock: ['', Validators.required]
  });
  constructor(private datePipe: DatePipe, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute) {
  }
  public settings = {
    actions: {
      position: 'right',
      delete: false
    },
    columns: {
      actual_price: {
        title: 'Actual Price'
      },
      selling_price: {
        title: 'Selling Price'
      },
      product_name: {
        title: 'Product Name'
      },
      in_stock: {
        title: 'In Stock',
        type: 'custom',
        renderComponent: UiSwitchToggleComponent
      },
      vendor_product_id: {
        hide: true
      }
    },
    hideSubHeader: true,
    mode: 'external'
  };
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uuid = params.get('uuid');
      this.getVendorProducts();
    })
  }

  getVendorProducts() {
    this.auth.getVendorProducts(this.uuid).subscribe(res => {
      console.log(res);
      this.vendorProduct = res;
    });
  }

  edit(element, modalName) {
    this.productedit.setValue({
      vendor_product_id: element.data.vendor_product_id,
      product_name: element.data.product_name,
      actual_price: element.data.actual_price,
      selling_price: element.data.selling_price,
      in_stock: element.data.in_stock
    })
    if (element.data.in_stock) {
      this.checked = true;
    }
    else {
      this.checked = false;
    }
    this.modalService.open(modalName, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  onChange(event) {
    if (event) {
      this.productedit.patchValue({
        in_stock: 1
      })
    }
    else {
      this.productedit.patchValue({
        in_stock: 0
      })
    }
  }

  updateProduct() {

    this.auth.updateVendorProduct(this.uuid, this.productedit.value).subscribe(
      (res) => {
        console.log(res.msg);
        Swal.fire({
          text: res.msg,
          icon: 'success'
        });
        this.modalService.dismissAll();
        this.getVendorProducts();
      }
    );
  }
}