import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessesComponent } from './businesses/businesses.component';

const routes: Routes = [
  {
    path: 'businesses', 
    component: BusinessesComponent,
    data: {
      title: "Business List",
      breadcrumb: "Business List"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
