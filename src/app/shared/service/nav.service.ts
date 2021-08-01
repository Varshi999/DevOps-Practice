import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      path: '/dashboard/default',
      title: 'Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'primary',
      active: false,
    },
    {
      title: 'Products',
      icon: 'box',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'List Product',
          type: 'link',
          path: '/products/list-products',
          active: false,
        },
        {
          path: '/products/add-product',
          title: 'Add Product',
          type: 'link',
        },
      ],
    },
    {
      title: 'Sales',
      icon: 'dollar-sign',
      type: 'sub',
      active: false,
      children: [
        { path: '/sales/orders', title: 'Orders', type: 'link' },
        { path: '/sales/transactions', title: 'Transactions', type: 'link' },
      ],
    },
    {
      title: 'Coupons',
      icon: 'tag',
      type: 'sub',
      active: false,
      children: [
        { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
        {
          path: '/coupons/create-coupons',
          title: 'Create Coupons',
          type: 'link',
        },
      ],
    },
    {
      title: 'Pages',
      icon: 'clipboard',
      type: 'sub',
      active: false,
      children: [
        { path: '/pages/list-page', title: 'List Page', type: 'link' },
        { path: '/pages/create-page', title: 'Create Page', type: 'link' },
      ],
    },
    {
      title: 'Media',
      path: '/media',
      icon: 'camera',
      type: 'link',
      active: false,
    },
    {
      title: 'Menus',
      icon: 'align-left',
      type: 'sub',
      active: false,
      children: [
        { path: '/menus/list-menu', title: 'Menu Lists', type: 'link' },
        { path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
      ],
    },
    {
      title: 'Customers',
      icon: 'user-plus',
      type: 'link',
      path: '/customers/list-user',
      active: false,
      //  children: [
      // 	{ path: '/users/list-user', title: 'User List', type: 'link' },
      // 	{ path: '/users/create-user', title: 'Create User', type: 'link' },
      // ]
    },
    {
      title: 'Brands',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        { path: '/brands/list-brands', title: 'Brands List', type: 'link' },
        // { path: '/category/create-vendors', title: 'Create Category', type: 'link' },
      ],
    },
    {
      title: 'Category',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/category/list-category',
          title: 'Category List',
          type: 'link',
        },
        // { path: '/category/create-vendors', title: 'Create Category', type: 'link' },
      ],
    },
    {
      title: 'Businesses',
      icon: 'users',
      type: 'link',
      path: '/business/businesses',
      active: false,
    },
    {
      title: 'deliverypartners',
      icon: 'users',
      type: 'link',
      path: '/deliverypartners',
      active: false,
    },
    {
      title: 'Localization',
      icon: 'chrome',
      type: 'sub',
      children: [
        {
          path: '/localization/translations',
          title: 'Translations',
          type: 'link',
        },
        {
          path: '/localization/currency-rates',
          title: 'Currency Rates',
          type: 'link',
        },
        { path: '/localization/taxes', title: 'Taxes', type: 'link' },
      ],
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: 'bar-chart',
      type: 'link',
      active: false,
    },
    {
      title: 'Settings',
      icon: 'settings',
      type: 'sub',
      children: [{ path: '/settings/profile', title: 'Profile', type: 'link' }],
    },
    {
      title: 'Invoice',
      path: '/invoice',
      icon: 'archive',
      type: 'link',
      active: false,
    },
    // {
    // 	title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
    // }
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
