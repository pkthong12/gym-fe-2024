import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: "sys-user",
    loadChildren:() => import('./sys-user/sys-user.routes').then((m) => m.routes)
  },
  {
    path: "gym-package",
    loadChildren:() => import('./gym-package/gym-package.routes').then((m) => m.routes)
  },
  {
    path: "gym-shift",
    loadChildren:() => import('./gym-shift/gym-shift.routes').then((m) => m.routes)
  },
  {
    path: "goods-list",
    loadChildren:() => import('./goods-list/goods-list.routes').then((m) => m.routes)
  }, 
  {
    path: "card-check-in",
    loadChildren:() => import('./ls-cartcheckin/ls-cart-checkin.routes').then((m) => m.routes)
  },
  {
    path: "goods-equipment",
    loadChildren:() => import('./goods-equipment/goods-equipment.routes').then((m) => m.routes)
  },
  {
    path: "goods-equipment-fix",
    loadChildren:() => import('./goods-equipment-fix/goods-equipment-fix.routes').then((m) => m.routes)
  },
  {
    path: "goods-discount-voucher",
    loadChildren:() => import('./goods-discount-voucher/goods-discount-voucher.routes').then((m) => m.routes)
  },
  {
    path: "locker",
    loadChildren:() => import('./gym-locker/gym-locker.routes').then((m) => m.routes)
  },
  {
    path: "locker-status",
    loadComponent:() => import('./locker-status/locker-status.component').then((m) => m.LockerStatusComponent)
  },
  {
    path: "bills",
    loadComponent:() => import('./order-bills/order-bills.component').then((m) => m.OrderBillsComponent)
  },
];