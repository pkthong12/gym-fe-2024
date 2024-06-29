import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DialogService } from '../../../../../services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gym-locker-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
  ],
  templateUrl: './gym-locker-edit.component.html',
  styleUrl: './gym-locker-edit.component.scss'
})
export class GymLockerEditComponent extends BaseEditComponent implements OnInit {
  title: string[] = ['Thông tin tủ','Wardrobe information'];
  subscriptions: Subscription[] = [];
  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;
  isMaintenance: boolean = true;
  getStaffGroupOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'LOCKER_STATUS';
  getGenderOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'GENDER';

  formLabel: any = {};

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null],
      area: [null,[Validators.required]],
      price: [null,[Validators.required]],
      statusId: [null,[Validators.required]],
      maintenanceFromDate: [null],
      maintenanceToDate: [null],
      note: [],
    })
    this.crud = {
      c: api.GOODS_LOCKER_CREATE,
      r: api.GOODS_LOCKER_READ,
      u: api.GOODS_LOCKER_UPDATE,
      d: api.GOODS_LOCKER_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã tủ' : 'Locker Code',
      area: !!this.language ? 'Khu vực' : 'Area',
      price: !!this.language ? 'Giá thuê 1 tiếng' : 'Price for one hour rental',
      status: !!this.language ? 'Trạng thái' : 'Status',
      maintenanceFromDate: !!this.language ? 'Bảo trì từ ngày' : 'Maintenance starting from date',
      maintenanceToDate: !!this.language ? 'Bảo trì đến ngày' : 'Maintenance starting to date',
      note: !!this.language ? 'Ghi chú' : 'Note',
    };
  }
  ngOnInit() {
    this.onFormCreated();
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
  onFormCreated(): void {
    this.form.get('statusId')?.valueChanges.subscribe(x=>{
      if(x == 10030){
        this.form.get('maintenanceFromDate')?.addValidators([Validators.required]);
        this.form.get('maintenanceToDate')?.addValidators([Validators.required]);
        this.form.updateValueAndValidity();
        this.isMaintenance = false;
      }else{
        this.form.get('maintenanceFromDate')?.clearValidators();
        this.form.get('maintenanceToDate')?.clearValidators();
        this.form.get('maintenanceFromDate')?.setValue(null);
        this.form.get('maintenanceToDate')?.setValue(null);
        this.form.updateValueAndValidity();
        this.isMaintenance = true;
      }
    })
  }
}
