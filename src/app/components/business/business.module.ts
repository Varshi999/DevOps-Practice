import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusinessesComponent } from './businesses/businesses.component';


@NgModule({
  declarations: [BusinessesComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    Ng2SmartTableModule,
    NgbModule
  ],
  providers: [
    DatePipe
  ],
})
export class BusinessModule { }
