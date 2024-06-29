import {  Routes } from '@angular/router';
import { SysOtherListTypeComponent } from './sys-other-list-type.component';
import { SysOtherListTypeEditComponent } from './sys-other-list-type-edit/sys-other-list-type-edit.component';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: "",
    component: SysOtherListTypeComponent,
  },
  {
    path: ":id",
    component: SysOtherListTypeEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];