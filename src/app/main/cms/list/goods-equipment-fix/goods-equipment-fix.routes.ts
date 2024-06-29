import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GoodsEquipmentFixComponent } from './goods-equipment-fix.component';
import { GoodsEquipmentFixEditComponent } from './goods-equipment-fix-edit/goods-equipment-fix-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GoodsEquipmentFixComponent,
  },
  {
    path: ":id",
    component: GoodsEquipmentFixEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];