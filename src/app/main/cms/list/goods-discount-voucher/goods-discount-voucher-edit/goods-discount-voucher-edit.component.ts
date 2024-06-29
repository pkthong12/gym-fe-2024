import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';

@Component({
  selector: 'app-goods-discount-voucher-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseEmployeeSearchComponent,
  ],
  templateUrl: './goods-discount-voucher-edit.component.html',
  styleUrl: './goods-discount-voucher-edit.component.css'
})
export class GoodsDiscountVoucherEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Thông tin Phiếu giảm giá','Discount Voucher Information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];
  
  getListDiscountTypeIdOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'DISCOUNT_TYPE';

  formLabel: any = {};
  
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null],
      name: [null,[Validators.required]],
      equipmentType: [null,[Validators.required]],
      manufacturer: [],
      purchaseDate: [null,[Validators.required]],
      statusId: [],
      warrantyExpiryDate: [null,[Validators.required]],
      cost: [null,[Validators.required]],
      address: [],
      managerId: [],
      note: [],
    })
    this.crud = {
      c: api.GOODS_DISCOUNT_VOUCHER_CREATE,
      r: api.GOODS_DISCOUNT_VOUCHER_READ,
      u: api.GOODS_DISCOUNT_VOUCHER_UPDATE,
      d: api.GOODS_DISCOUNT_VOUCHER_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã voucher' : 'Voucher Code',
      voucherType: !!this.language ? 'Loại voucher' : 'Voucher Type',
      name: !!this.language ? 'Tên voucher' : 'Voucher Name',
      dicountValue: !!this.language ? 'Giá trị giảm giá' : 'Discount value',
      startDate: !!this.language ? 'Ngày bắt đầu' : 'Start Date',
      endDate: !!this.language ? 'Ngày kết thúc' : 'End Date',
      issueQuantity: !!this.language ? 'Số lượng phát hành' : 'Issue quantity',
      usedQuantity: !!this.language ? 'Số lượng đã sử dụng' : 'Quantity used',
      note: !!this.language ? 'Ghi chú' : 'Note',
      
    };
  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
