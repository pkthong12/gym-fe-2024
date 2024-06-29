import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { CardIssuanceEditComponent } from './card-issuance-edit/card-issuance-edit.component';
import { CardIssuanceComponent } from './card-issuance.component';

export const routes: Routes = [
  {
    path: "",
    component: CardIssuanceComponent,
  },
  {
    path: ":id",
    component: CardIssuanceEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];