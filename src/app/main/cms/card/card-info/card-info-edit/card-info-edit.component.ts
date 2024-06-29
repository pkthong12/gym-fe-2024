import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { HttpRequestService } from '../../../../../services/http.service';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';
import { DialogService } from '../../../../../services/dialog.service';
import { BaseCustomerSearchComponent } from '../../../../../libraries/base-customer-search/base-customer-search.component';

@Component({
  selector: 'app-card-info-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseCustomerSearchComponent
  ],
  templateUrl: './card-info-edit.component.html',
  styleUrl: './card-info-edit.component.scss'
})
export class CardInfoEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Thông tin thẻ', 'Information card'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!: any[];
  subscriptions: Subscription[] = [];

  apiParams: string[] = ["TYPE_CARD"];
  getCardTypeOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE + 'TYPE_CARD';
  getCustomerOptions$: string = api.CARD_INFO_GET_LIST_CUSTOMER;
  getGymShiftOptions$: string = api.GYM_SHIFT_GET_LIST;

  formLabel: any = {};

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
  ) {
    super(dialogService);
    this.form = this.fb.group({
      id: [],
      code: [null],
      cardTypeId: [null, [Validators.required]],
      effectedDate: [null, [Validators.required]],
      expiredDate: [null, [Validators.required]],
      expiredDateString: [null],
      wardrobe: [null],
      isHavePt: [null],
      price: [null, [Validators.required]],
      shiftId: [null, [Validators.required]],
      note: [],
    })
    this.crud = {
      c: api.CARD_INFO_CREATE,
      r: api.CARD_INFO_READ,
      u: api.CARD_INFO_UPDATE,
      d: api.CARD_INFO_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã thẻ' : 'Card Code',
      cardType: !!this.language ? 'Tên loại thẻ' : 'Card Type',
      effectedDate: !!this.language ? 'Ngày hiệu lực' : 'Effected Date',
      expiredDate: !!this.language ? 'Ngày hết hiệu lực' : 'Expired Date',
      wardrobe: !!this.language ? 'Có tủ đồ' : 'Has a locker',
      isHavePt: !!this.language ? 'Có PT' : 'Has PT',
      shift: !!this.language ? 'Ca tập' : 'Shift',
      price: !!this.language ? 'Giá tiền' : 'Price',
      note: !!this.language ? 'Ghi chú' : 'Note',
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
              case 'TYPE_CARD':
                this.otherListTypeOptions = options;
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

  onDropdownSelected(event: any, e: string): void {
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
  onSelectCustomerId(event: any, e: string): void {
    this.form.get(e)?.setValue(!!event ? event.id : null);
    this.form.get(e)?.markAllAsTouched();
  }
}
