import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { SysOtherListComponent } from './sys-other-list.component';
import { SysOtherListEditComponent } from './sys-other-list-edit/sys-other-list-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: SysOtherListComponent,
  },
  {
    path: ":id",
    component: SysOtherListEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];