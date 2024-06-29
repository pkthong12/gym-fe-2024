import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "employees",
    loadChildren:() => import('./hu-employee/hu-employee.routes').then((m) => m.routes)
  },
  {
    path: "per-customer",
    loadChildren:() => import('./per-customer/per-customer.routes').then((m) => m.routes)
  },
  {
    path: "per-customer-transaction",
    loadChildren:() => import('./per-customer-transaction/per-customer-transaction.routes').then((m) => m.routes)
  },
  {
    path: "per-customer-list-card",
    loadChildren:() => import('./per-customer-list-card/per-customer-list-card.routes').then((m) => m.routes)
  },
];