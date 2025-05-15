import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { Subscription } from 'rxjs';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';

@Component({
  selector: 'app-goods-equipment-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseEmployeeSearchComponent,
  ],
  templateUrl: './goods-equipment-edit.component.html',
  styleUrl: './goods-equipment-edit.component.css'
})
export class GoodsEquipmentEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Thông tin thiết bị','Equipment information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];
  
  getListEquipmentTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'EQUIPMENT_TYPE';

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
      c: api.GOODS_EQUIPMENT_CREATE,
      r: api.GOODS_EQUIPMENT_READ,
      u: api.GOODS_EQUIPMENT_UPDATE,
      d: api.GOODS_EQUIPMENT_DELETE_IDS,
    }

    this.formLabel = {
      code: !this.language ? 'Mã thiết bị' : 'Equipment Code',
      equipmentType: !this.language ? 'Loại thiết bị' : 'Equipment Type',
      name: !this.language ? 'Tên thiết bị' : 'Equipment Name',
      manufacturer: !this.language ? 'Nhà sản xuất' : 'Manufacturer',
      purchaseDate: !this.language ? 'Ngày mua' : 'Purchase Date',
      warrantyExpiryDate: !this.language ? 'Ngày hết bảo hành' : 'Warranty Expiry Date',
      manager: !this.language ? 'Người quản lý' : 'Manager',
      cost: !this.language ? 'Giá tiền' : 'Price',
      address: !this.language ? 'Vị trí đặt' : 'Placement location',
      note: !this.language ? 'Ghi chú' : 'Note',
      
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
