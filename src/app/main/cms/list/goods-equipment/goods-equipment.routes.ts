import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GoodsEquipmentComponent } from './goods-equipment.component';
import { GoodsEquipmentEditComponent } from './goods-equipment-edit/goods-equipment-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GoodsEquipmentComponent,
  },
  {
    path: ":id",
    component: GoodsEquipmentEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];