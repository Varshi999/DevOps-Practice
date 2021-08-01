import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBrandsComponent } from './list-brands/list-brands.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'list-brands',
      component: ListBrandsComponent,
      data: {
        title: "Brands List",
        breadcrumb: "Brands List"
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
