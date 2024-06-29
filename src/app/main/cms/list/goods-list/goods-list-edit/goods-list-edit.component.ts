import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { api } from '../../../../../constants/api/apiDefinitions';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';

@Component({
  selector: 'app-goods-list-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseEmployeeSearchComponent
  ],
  templateUrl: './goods-list-edit.component.html',
  styleUrl: './goods-list-edit.component.scss'
})
export class GoodsListEditComponent extends BaseEditComponent  implements OnInit, AfterViewInit, OnDestroy{
  title: string[] = ['Thông tin hàng hóa','Goods information'];

  modalMode: boolean = false;//for modal and style modal
  crud!: ICorePageEditCRUD;

  subscriptions: Subscription[] = [];

  productTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'GOODS_LIST_TYPE';
  measureTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'MEASURE';
  statusTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'GOODS_STATUS';

  formLabel: any = {};

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null],
      name: [null,[Validators.required]],
      productTypeId: [null,[Validators.required]],
      supplier: [],
      importPrice: [null,[Validators.required]],
      price: [null,[Validators.required]],
      quantity: [],
      measureId: [],
      receivingDate: [],
      expireDate: [],
      location: [],
      note: [],
      batchNo: [],
      warrantyInfor: [],
      description: [],
      source: [],
      managerId: [],
      status: [],
    })
    this.crud = {
      c: api.GOODS_LIST_CREATE,
      r: api.GOODS_LIST_READ,
      u: api.GOODS_LIST_UPDATE,
      d: api.GOODS_LIST_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã sản phẩm' : 'Product Code',
      name: !!this.language ? 'Tên sản phẩm' : 'Product Name',
      productTypeName: !!this.language ? 'Loại sản phẩm' : 'Product Type',
      supplier: !!this.language ? 'Nhà cung cấp' : 'Supplier',
      importPrice: !!this.language ? 'Giá nhập' : 'Import Price',
      price: !!this.language ? 'Giá bán' : 'Price',
      quantity: !!this.language ? 'Số lượng tồn kho' : 'Quantity',
      measureName: !!this.language ? 'Đơn vị' : 'Measure',
      receivingDate: !!this.language ? 'Ngày nhập kho' : 'Receiving Date',
      expireDate: !!this.language ? 'Ngày hết hạn' : 'Expire Date',
      location: !!this.language ? 'Vị trí kho' : 'Location',
      status: !!this.language ? 'Trạng thái' : 'Status',
      note: !!this.language ? 'Ghi chú' : 'Note',
      batchNo: !!this.language ? 'Số lô hàng' : 'Batch No',
      warrantyInfor: !!this.language ? 'Thông tin bảo hành' : 'Warranty Information',
      description: !!this.language ? 'Mô tả chi tiết' : 'Description',
      source: !!this.language ? 'Nguồn gốc' : 'Source',
      managerName: !!this.language ? 'Người quản lý' : 'Manager Name',
    };
  }
  

  
  ngOnInit(): void {

  }
  
  ngAfterViewInit(): void {
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
}
