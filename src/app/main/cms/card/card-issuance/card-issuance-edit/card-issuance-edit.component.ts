import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription, distinctUntilChanged, filter, forkJoin } from 'rxjs';
import { api } from '../../../../../constants/api/apiDefinitions';
import { CheckListComponent } from '../../../../../libraries/base-checklist/base-checklist.component';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { BaseEmployeeSearchComponent } from '../../../../../libraries/base-employee-search/base-employee-search.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { BaseCustomerSearchComponent } from '../../../../../libraries/base-customer-search/base-customer-search.component';

@Component({
  selector: 'app-card-issuance-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    CheckListComponent,
    BaseEmployeeSearchComponent,
    BaseCustomerSearchComponent
  ],
  templateUrl: './card-issuance-edit.component.html',
  styleUrl: './card-issuance-edit.component.scss'
})
export class CardIssuanceEditComponent extends BaseEditComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  title: string[] = ['Cấp thẻ', 'Card issuance'];

  formLabel: any = {};

  modalMode: boolean = false;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!: any[];
  genderOptions!: any[];
  customerGroupOptions!: any[];
  nativeOptions!: any[];
  religionOptions!: any[];
  bankOptions!: any[];
  bankBranchOptions!: any[];
  subscriptions: Subscription[] = [];

  getListCardOptions$: string = api.CARD_INFO_GET_ALL_CARD_VALID;
  getListLockerOptions$!: string;
  getNativeIdOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE + 'NATIVE';
  getReligionOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE + 'RELIGION';
  getBankOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE + 'BANK';
  geCusStatusOptions$: string = api.SYS_OTHER_LIST_GET_LIST_BY_TYPE + 'CUS_STATUS';

  isFirst: boolean = true;
  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
  ) {
    super(dialogService);
    this.form = this.fb.group({
      id: [null],
      documentNumber: [null],
      documentDate: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
      customerName: [null, [Validators.required]],
      customerCode: [null],
      perSellId: [null],
      cardId: [null, [Validators.required]],
      hourCard: [null],
      practiceTime: [null],
      startDate: [null],
      endDate: [null],
      hourCardBonus: [null],
      totalHourCard: [null],
      wardrobe: [null],
      lockerId: [null],
      isHavePt: [null],
      perPtId: [null],
      isRealPrice: [null],
      cardPrice: [null],
      percentDiscount: [null],
      afterDiscount: [null],
      percentVat: [null],
      totalPrice: [null, [Validators.required]],
      moneyHavePay: [null],
      paidMoney: [null],
      note: [null],
    })
    this.crud = {
      c: api.CARD_ISSUANCE_CREATE,
      r: api.CARD_ISSUANCE_READ,
      u: api.CARD_ISSUANCE_UPDATE,
      d: api.CARD_ISSUANCE_DELETE_IDS,
    }

    this.formLabel = {
      documentNumber: !!this.language ? 'Số chứng từ' : 'Document Number',
      documentDate: !!this.language ? 'Ngày chứng từ' : 'Document date',
      customerCode: !!this.language ? 'Mã khách hàng' : 'Customer Code',
      customerName: !!this.language ? 'Tên khách hàng' : 'Customer Name',
      card: !!this.language ? 'Thẻ tập' : 'Card',
      practiceTime: !!this.language ? 'Khung giờ tập' : 'Exercise time',
      startDate: !!this.language ? 'Ngày bắt đầu' : 'Start Date',
      endDate: !!this.language ? 'Ngày kết thúc' : 'End Date',
      hourCard: !!this.language ? 'Số giờ tập' : 'Number of exercise hours',
      houhourCardBonusrCard: !!this.language ? 'Số giờ tặng thêm' : 'Number of bonus exercise hours',
      totalHourCard: !!this.language ? 'Tổng số giờ' : 'Total exercise hours',
      perSell: !!this.language ? 'Nhân viên bán hàng' : 'Salesperson',
      wardrobe: !!this.language ? 'Có tủ đồ' : 'Has a locker',
      locker: !!this.language ? 'Tủ đồ' : 'Locker',
      isHavePt: !!this.language ? 'Có PT' : 'Has PT',
      perPt: !!this.language ? 'Huấn luyện viên' : 'Personal Traning',
      cardPrice: !!this.language ? 'Giá thẻ' : 'Card Price',
      percentVat: !!this.language ? '% VAT' : '% VAT',
      totalPrice: !!this.language ? 'Tổng tiền' : 'Total Price',
      percentDiscount: !!this.language ? '% giảm giá' : '% Discount',
      afterDiscount: !!this.language ? 'Số tiền sau giảm giá' : 'Price After Discount',
      moneyHavePay: !!this.language ? 'Số tiền phải trả' : 'The amount to be paid',
      paidMoney: !!this.language ? 'Số tiền đã trả' : 'The amount paid',
      note: !!this.language ? 'Ghi chú' : 'Note',
    };

    this.onFormCreated()
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  onFormCreated() {
    this.subscriptions.push(
      this.form.get('id')?.valueChanges.subscribe(x => {
        this.getListCardOptions$ = this.getListCardOptions$ + `?id=${this.form.get('cardId')?.value}`;
        this.getLocker();
      })!,

      this.form.get('cardId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          this.getInfoCard(x);
          this.getLocker();
        })!,
      this.form.get('customerId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        this.getLocker();
      })!,
      this.form.get('hourCard')?.valueChanges.subscribe(x => {
        this.calculateTotalHour()
      })!,
      this.form.get('hourCardBonus')?.valueChanges.subscribe(x => {
        this.calculateTotalHour()
      })!,
      this.form.get('cardPrice')?.valueChanges.subscribe(x => {
        this.calculateTotalPrice()
      })!,
      this.form.get('percentVat')?.valueChanges.subscribe(x => {
        this.calculateTotalPrice()
      })!,
      this.form.get('percentDiscount')?.valueChanges.subscribe(x => {
        this.calculateAfterDiscount()
      })!,
      this.form.get('totalPrice')?.valueChanges.subscribe(x => {
        this.calculateAfterDiscount()
      })!,
      this.form.get('wardrobe')?.valueChanges.subscribe(x => {
        if(x != true){
          this.form.get('lockerId')?.setValue(null)
        }
      })!,
      this.form.get('isHavePt')?.valueChanges.subscribe(x => {
        if(x != true){
          this.form.get('perPtId')?.setValue(null)
        }
      })!,
    )
  }
  getInfoCard(id: any) {
    this.subscriptions.push(
      this.httpService.makeGetRequest('getInfoCard', api.CARD_INFO_CALCULATE + id).subscribe(res => {
        if (res.status == 200 && res.ok == true) {
          this.form.patchValue(res.body.innerBody)
        }
      })
    )
  }
  getLocker() {
    var cardId = this.form.get('cardId')?.value;
    var customerId = this.form.get('customerId')?.value
    if (!customerId || !cardId) {
    }
    else {
      var lockerId = this.form.get('lockerId')?.value
      this.getListLockerOptions$ = api.GOODS_LOCKER_GET_ALL_LOCKER_VALID + `?cardId=${cardId}&cusId=${customerId}&id=${lockerId}`;
    }
  }
  calculateTotalHour() {
    const hourCard = this.form.get('hourCard')?.value ?? 0;
    const hourCardBonus = this.form.get('hourCardBonus')?.value ?? 0;
    this.form.get('totalHourCard')?.setValue(hourCard + hourCardBonus);
  }
  calculateTotalPrice() {
    var cardPrice = this.form.get('cardPrice')?.value ?? 0;
    var percentVat = this.form.get('percentVat')?.value ?? 0;
    cardPrice += cardPrice * percentVat / 100;
    this.form.get('totalPrice')?.setValue(cardPrice);
  }
  calculateAfterDiscount() {
    var totalPrice = this.form.get('totalPrice')?.value ?? 0;
    var percentDiscount = this.form.get('percentDiscount')?.value ?? 0;
    var totalDis = totalPrice - totalPrice * percentDiscount / 100;
    this.form.get('afterDiscount')?.setValue(totalDis);
    this.form.get('moneyHavePay')?.setValue(totalDis);
  }
  ngOnInit(): void {
    // this.getListOtherListTypes();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.form.get('id')?.value);
    })
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
  selectedDataChange(event: any, e: string, m: string) {
    this.form.get(e)?.setValue(event[m]);
    this.form.get(e)?.markAllAsTouched();
  }
}
