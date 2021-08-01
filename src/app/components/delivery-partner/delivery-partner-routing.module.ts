import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDeliveryPartnerComponent } from './create-delivery-partner/create-delivery-partner.component';
import { ListDeliveryPartnersComponent } from './list-delivery-partners/list-delivery-partners.component';

const routes: Routes = [  {
  path: '', 
  component: ListDeliveryPartnersComponent,
  data: {
    title: "delivery partners List",
    breadcrumb: "delivery partners List"
  }
},
{
  path: 'createdeliverypartner', 
  component: CreateDeliveryPartnerComponent,
  data: {
    title: "Create delivery partner ",
    breadcrumb: "Create delivery partner "
  } 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryPartnerRoutingModule { }
