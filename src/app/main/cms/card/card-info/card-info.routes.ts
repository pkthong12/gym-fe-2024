import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { CardInfoComponent } from './card-info.component';
import { CardInfoEditComponent } from './card-info-edit/card-info-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: CardInfoComponent,
  },
  {
    path: ":id",
    component: CardInfoEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];