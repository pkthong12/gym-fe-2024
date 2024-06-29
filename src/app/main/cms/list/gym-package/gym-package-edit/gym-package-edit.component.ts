import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { api } from '../../../../../constants/api/apiDefinitions';
import { BaseCustomerSearchComponent } from '../../../../../libraries/base-customer-search/base-customer-search.component';
import { errorMessage } from '../../../../../constants/error-control'
import { AppConfigService } from '../../../../../services/app-config.service';

@Component({
  selector: 'app-gym-package-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseCustomerSearchComponent
  ],
  templateUrl: './gym-package-edit.component.html',
  styleUrl: './gym-package-edit.component.css'
})
export class GymPackageEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Gói tập', 'Gym Package'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!: any[];
  subscriptions: Subscription[] = [];
  formLabel: any = {};

  getListShiftOptions$: any = api.GYM_SHIFT_GET_LIST;
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
    public appConfig: AppConfigService
  ) {
    super(dialogService);
    this.form = this.fb.group({
      id: [],
      isActive: [],
      code: [null, [Validators.required]],
      money: [null, [Validators.required]],
      period: [null, [Validators.required]],
      shiftId: [null, [Validators.required]],
      isPrivate: [],
      description: [],
    })
    this.crud = {
      c: api.GYM_PACKAGE_CREATE,
      r: api.GYM_PACKAGE_READ,
      u: api.GYM_PACKAGE_UPDATE,
      d: api.GYM_PACKAGE_DELETE_IDS,
    }
    this.language = this.appConfig.LANGUAGE;

    this.formLabel = {
      code: !this.language ? 'Mã gói cước' : 'Gym package code',
      money: !this.language ? 'Giá' : 'Price',
      period: !this.language ? 'Thời hạn' : 'Duration',
      isPrivate: !this.language?'Gói tập riêng':'Separate training package',
      shiftId: !this.language ? 'Ca tập' : 'Shift',
      description: !this.language ? 'Mô tả' : 'Description',
    };
  }

  onDropdownSelected(event: any, e: string): void {
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
