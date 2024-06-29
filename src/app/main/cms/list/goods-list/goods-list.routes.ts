import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GoodsListComponent } from './goods-list.component';
import { GoodsListEditComponent } from './goods-list-edit/goods-list-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GoodsListComponent,
  },
  {
    path: ":id",
    component: GoodsListEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];