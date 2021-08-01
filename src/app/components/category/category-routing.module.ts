import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-category',
        component: ListCategoryComponent,
        data: {
          title: "Category List",
          breadcrumb: "Category List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
