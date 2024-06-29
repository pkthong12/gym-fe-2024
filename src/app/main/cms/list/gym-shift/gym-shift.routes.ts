import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GymShiftComponent } from './gym-shift.component';
import { GymShiftEditComponent } from './gym-shift-edit/gym-shift-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GymShiftComponent,
  },
  {
    path: ":id",
    component: GymShiftEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];