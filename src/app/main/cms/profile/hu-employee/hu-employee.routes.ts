import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { HuEmployeeComponent } from './hu-employee.component';
import { HuEmployeeEditComponent } from './hu-employee-edit/hu-employee-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: HuEmployeeComponent,
  },
  {
    path: ":id",
    component: HuEmployeeEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];