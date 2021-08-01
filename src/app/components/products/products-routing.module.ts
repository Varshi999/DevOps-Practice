import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent } from './list-products/list-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-product',
        component: AddProductComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      },
      {
        path: 'list-products',
        component: ListProductsComponent,
        data: {
          title: "List Products",
          breadcrumb: "List Products"
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
