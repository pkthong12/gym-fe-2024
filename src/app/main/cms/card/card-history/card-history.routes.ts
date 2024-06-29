import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { CardHistoryComponent } from './card-history.component';

export const routes: Routes = [
  {
    path: "",
    component: CardHistoryComponent,
  },
];