import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { SysUserComponent } from './sys-user.component';
import { SysUserEditComponent } from './sys-user-edit/sys-user-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: SysUserComponent,
  },
  {
    path: ":id",
    component: SysUserEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];