import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GoodsDiscountVoucherComponent } from './goods-discount-voucher.component';
import { GoodsDiscountVoucherEditComponent } from './goods-discount-voucher-edit/goods-discount-voucher-edit.component';

export const routes: Routes = [
  {
    path: "",
    component: GoodsDiscountVoucherComponent,
  },
  {
    path: ":id",
    component: GoodsDiscountVoucherEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];