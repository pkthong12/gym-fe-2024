import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { Subscription } from 'rxjs';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';
import { CheckListComponent } from '../../../../../libraries/base-checklist/base-checklist.component';

@Component({
  selector: 'app-sys-user-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseEmployeeSearchComponent,
    CheckListComponent
  ],
  templateUrl: './sys-user-edit.component.html',
  styleUrl: './sys-user-edit.component.css'
})
export class SysUserEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Tài khoản','User'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!:any[];
  subscriptions: Subscription[] = [];

  getListTypeOptions$: any = api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'USER_GROUP';
  getMenuOptions$: any = api.SYS_MENU_GET_ALL_ACTION;
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      groupId: [null,[Validators.required]],
      username: [null,[Validators.required]],
      fullname: [null,[Validators.required]],
      employeeId: [null],
      password: [null,[Validators.required]],
      rePassword: [null,[Validators.required]],
      decentralizationList: [null],

    })
    this.crud = {
      c: api.SYS_USER_CREATE,
      r: api.SYS_USER_READ,
      u: api.SYS_USER_UPDATE,
      d: api.SYS_USER_DELETE_IDS,
    }
  }

  onDropdownSelected(event:any, e:any):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
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
}
