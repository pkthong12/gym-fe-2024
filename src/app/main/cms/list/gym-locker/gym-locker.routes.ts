import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GymLockerComponent } from './gym-locker.component';
import { GymLockerEditComponent } from './gym-locker-edit/gym-locker-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GymLockerComponent,
  },
  {
    path: ":id",
    component: GymLockerEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];