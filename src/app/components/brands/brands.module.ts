import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { ListBrandsComponent } from './list-brands/list-brands.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListBrandsComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    NgbModule,
    Ng2SmartTableModule,
    ReactiveFormsModule
  ]
})
export class BrandsModule { }
