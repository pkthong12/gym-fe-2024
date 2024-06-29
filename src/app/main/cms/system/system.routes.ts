import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';
import { SysOtherListTypeComponent } from './sys-other-list-type/sys-other-list-type.component';

export const routes: Routes = [
  {
    path: "sys-other-list-type",
    loadChildren:() => import('./sys-other-list-type/sys-other-list-type.routes').then((m) => m.routes)
  },
  {
    path: "sys-other-list",
    loadChildren:() => import('./sys-other-list/sys-other-list.routes').then((m) => m.routes)
  },
  {
    path: "decentralization",
    loadComponent:() => import('./decentralization/decentralization.component').then((m) => m.DecentralizationComponent)
  }
  
];