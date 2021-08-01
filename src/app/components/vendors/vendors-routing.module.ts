import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListVendorsComponent } from './list-vendors/list-vendors.component';
import { CreateVendorsComponent } from './create-vendors/create-vendors.component';
import { VendorProductListComponent } from './vendor-product-list/vendor-product-list.component';
import { AddVendorProductComponent } from './add-vendor-product/add-vendor-product.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-vendors',
        component: ListVendorsComponent,
        data: {
          title: "Vendor List",
          breadcrumb: "Vendor List"
        }
      },
      {
        path: 'create-vendors',
        component: CreateVendorsComponent,
        data: {
          title: "Create Vendor",
          breadcrumb: "Create Vendor"
        }
      },
      {
        path: 'vendor-product-list/:uuid',
        component: VendorProductListComponent,
        data: {
          title: "Vendor Products",
          breadcrumb: "Vendor Products"
        }
      },
      {
        path: 'add-vendor-product/:uuid',
        component: AddVendorProductComponent,
        data: {
          title: "Add Vendor Products",
          breadcrumb: "Add Vendor Products"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorsRoutingModule { }
