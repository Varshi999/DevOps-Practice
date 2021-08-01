import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  { path: 'category', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule) },
  { path: 'brands', loadChildren: () => import('./components/brands/brands.module').then(m => m.BrandsModule) },
  // { path: 'category', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
