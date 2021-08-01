import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgbModule,
    Ng2SmartTableModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
