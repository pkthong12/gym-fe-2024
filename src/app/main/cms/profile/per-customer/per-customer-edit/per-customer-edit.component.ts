import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { Subscription, forkJoin } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { api } from '../../../../../constants/api/apiDefinitions';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { CheckListComponent } from '../../../../../libraries/base-checklist/base-checklist.component';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';

@Component({
  selector: 'app-per-customer-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    CheckListComponent,
    BaseEmployeeSearchComponent
  ],
  templateUrl: './per-customer-edit.component.html',
  styleUrl: './per-customer-edit.component.scss'
})
export class PerCustomerEditComponent extends BaseEditComponent  implements OnInit, AfterViewInit, OnDestroy{
  title: string[] = ['Thông tin khách hàng','Information customer'];

  modalMode: boolean = false;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!:any[];
  genderOptions!: any[];
  customerGroupOptions!: any [];
  nativeOptions!: any[];
  religionOptions!: any[];
  bankOptions!: any[];
  bankBranchOptions!: any[];
  subscriptions: Subscription[] = [];

  apiParams: string[] = ["CUSTOMER_GROUP", "GENDER", "NATIVE", "RELIGION", "BANK", "BANK_BRANCH"];

  getCustomerOptions$:string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'CUSTOMER_GROUP';
  getGenderOptions$:string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'GENDER';
  getNativeIdOptions$:string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'NATIVE';
  getReligionOptions$:string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'RELIGION';
  getBankOptions$:string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'BANK';
  geCusStatusOptions$:string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE+'CUS_STATUS';

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
      fullName: [null,[Validators.required]],
      customerClassId: [null,[Validators.required]],
      phoneNumber: [],
      email: [],
      avatar: [],
      genderId: [],
      statusId: [],
      address: [],
      birthDate: [null,[Validators.required]],
      note: [],
      perPtId:[],
      idNo:[],
      isGuestPass:[]
    })
    this.crud = {
      c: api.PER_CUSTOMER_CREATE,
      r: api.PER_CUSTOMER_READ,
      u: api.PER_CUSTOMER_UPDATE,
      d: api.PER_CUSTOMER_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã khách hàng' : 'Customer Code',
      customerType: !!this.language ? 'Nhóm khách hàng' : 'Customer Group Type',
      name: !!this.language ? 'Họ tên khách hàng' : 'Customer Name',
      gender: !!this.language ? 'Giới tính' : 'Gender',
      dateOfBirth: !!this.language ? 'Ngày sinh' : 'Date of Birth',
      idNo: !!this.language ? 'Số CMND/CCCD' : 'ID No',
      phoneNumber: !!this.language ? 'Số điện thoại' : 'Phone Number',
      email: !!this.language ? 'Email cá nhân' : 'Email',
      address: !!this.language ? 'Địa chỉ' : 'Address',
      note: !!this.language ? 'Ghi chú' : 'Note',
      isGuestPass: !!this.language ? 'Là khách tập thử' : 'Is a test guest',
      customerStatus: !!this.language ? 'Trạng thái khách hàng' : 'Customer Status'
    };
  }
  

  getListOtherListTypes() {
    forkJoin(this.apiParams.map(param => this.httpService.makeGetRequest('', api.SYS_OTHER_LIST_GET_LIST_BY_GROUP + param)))
      .subscribe(responses => {
        responses.forEach((item, index) => {
          if (item.body.statusCode == 200 && item.ok == true) {
            const options: { value: number | null; text: string; }[] = [];
            item.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              });
            });
            const param = this.apiParams[index];
            switch (param) {
              case 'GENDER':
                this.genderOptions = options;
                break;
              case 'CUSTOMER_GROUP':
                this.customerGroupOptions = options;
                break;
              case 'NATIVE':
                this.nativeOptions = options;
                break;
              case 'RELIGION':
                this.religionOptions = options;
                break;
              case 'BANK':
                this.bankOptions = options;
                break;
              case 'BANK_BRANCH':
                this.bankBranchOptions = options;
                break;
              default:
                break;
            }
          }
        });
      });
  }

  ngOnInit(): void {
    this.getListOtherListTypes();
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
