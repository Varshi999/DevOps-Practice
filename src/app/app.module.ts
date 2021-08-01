import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';;
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import { TokenInterceptorService } from './../app/components/auth/token-interceptor.service';
import { from } from 'rxjs';
import { AuthGuard } from './components/auth/auth.guard';
import { CategoryModule } from './components/category/category.module';
import { BusinessModule } from './components/business/business.module';
import { DeliveryPartnerModule } from './components/delivery-partner/delivery-partner.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    InvoiceModule,
    HttpClientModule,
    SettingModule,
    ReportsModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    DeliveryPartnerModule,
    BusinessModule,
    CategoryModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
