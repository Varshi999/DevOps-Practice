import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { ListVendorsComponent } from './list-vendors/list-vendors.component';
import { CreateVendorsComponent } from './create-vendors/create-vendors.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UiSwitchModule } from 'ngx-ui-switch';
import { UiSwitchToggleComponent } from './ui-switch-toggle/ui-switch-toggle.component';
import { DatePipe } from '@angular/common';
import { VendorProductListComponent } from './vendor-product-list/vendor-product-list.component';
import { AddVendorProductComponent } from './add-vendor-product/add-vendor-product.component';

@NgModule({
  declarations: [ListVendorsComponent, CreateVendorsComponent, UiSwitchToggleComponent, VendorProductListComponent, AddVendorProductComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    UiSwitchModule,
    Ng2SmartTableModule
  ],
  providers: [
    DatePipe
  ],
})
export class VendorsModule { }
