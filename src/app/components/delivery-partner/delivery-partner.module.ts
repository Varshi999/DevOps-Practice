import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DeliveryPartnerRoutingModule } from './delivery-partner-routing.module';
import { ListDeliveryPartnersComponent } from './list-delivery-partners/list-delivery-partners.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDeliveryPartnerComponent } from './create-delivery-partner/create-delivery-partner.component';


@NgModule({
  declarations: [ListDeliveryPartnersComponent,CreateDeliveryPartnerComponent],
  imports: [
    Ng2SmartTableModule,
    CommonModule,
    ReactiveFormsModule,
    DeliveryPartnerRoutingModule
  ],providers: [
    DatePipe
  ],
})
export class DeliveryPartnerModule { }
