import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';

@Component({
  selector: 'app-hu-employee-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseEmployeeSearchComponent
  ],
  templateUrl: './hu-employee-edit.component.html',
  styleUrl: './hu-employee-edit.component.scss'
})
export class HuEmployeeEditComponent extends BaseEditComponent implements OnInit {
  title: string[] = ['Thông tin nhân viên','Employee information'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  formLabel: any = {};

  getStaffGroupOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'STAFF_GROUP';
  getGenderOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'GENDER';
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null],
      fullName: [null,[Validators.required]],
      birthDate: [null,[Validators.required]],
      genderId: [null,[Validators.required]],
      staffGroupId: [null,[Validators.required]],
      idNo: [null,[Validators.required]],
      phoneNumber: [null,[Validators.required]],
      address: [null,[Validators.required]],
      mail: [null],
      note: [],
    })
    this.crud = {
      c: api.PER_EMPLOYEE_CREATE,
      r: api.PER_EMPLOYEE_READ,
      u: api.PER_EMPLOYEE_UPDATE,
      d: api.PER_EMPLOYEE_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã nhân viên' : 'Employee Code',
      name: !!this.language ? 'Họ và tên' : 'Employee Name',
      gender: !!this.language ? 'Giới tính' : 'Gender',
      dateOfBirth: !!this.language ? 'Ngày sinh' : 'Date of Birth',
      idNo: !!this.language ? 'Số CMND/CCCD' : 'ID No',
      employeeType: !!this.language ? 'Nhóm nhân viên' : 'Group Type',
      phoneNumber: !!this.language ? 'Số điện thoại' : 'Phone Number',
      email: !!this.language ? 'Email cá nhân' : 'Email',
      address: !!this.language ? 'Địa chỉ' : 'Address',
      note: !!this.language ? 'Ghi chú' : 'Note',
    };
  }
  ngOnInit() {
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
}
