import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GymPackageComponent } from './gym-package.component';
import { GymPackageEditComponent } from './gym-package-edit/gym-package-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GymPackageComponent,
  },
  {
    path: ":id",
    component: GymPackageEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];