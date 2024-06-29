import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { CardCheckInComponent } from './card-check-in.component';
import { CardCheckInEditComponent } from './card-check-in-edit/card-check-in-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: CardCheckInComponent,
  },
  {
    path: ":id",
    component: CardCheckInEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];