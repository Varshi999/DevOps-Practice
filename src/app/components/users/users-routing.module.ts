import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserAddressComponent } from './user-address/user-address.component';

const routes: Routes = [
  {
    path: 'useraddress',
    component: UserAddressComponent,
    data: {
      title: 'User Addresses',
      breadcrumb: 'User Addresses',
    },
  },

  {
    path: 'list-user',
    component: ListUserComponent,
    data: {
      title: 'Customer List',
      breadcrumb: 'Customer List',
    },
  },

  {
    path: 'create-user',
    component: CreateUserComponent,
    data: {
      title: 'Create User',
      breadcrumb: 'Create User',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
