import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { LsCartCheckinComponent } from './ls-cart-checkin.component';

export const routes: Routes = [
  {
    path: "",
    component: LsCartCheckinComponent,
  },
  // {
  //   path: ":id",
  //   component: LsCartCheckinEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // }
];