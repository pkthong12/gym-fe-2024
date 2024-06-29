import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { PerCustomerComponent } from './per-customer.component';
import { PerCustomerEditComponent } from './per-customer-edit/per-customer-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: PerCustomerComponent,
  },
  {
    path: ":id",
    component: PerCustomerEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];