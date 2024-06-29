import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseCustomerSearchComponent } from '../../../../../libraries/base-customer-search/base-customer-search.component';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../../services/dialog.service';
import { HttpRequestService } from '../../../../../services/http.service';
import { api } from '../../../../../constants/api/apiDefinitions';

@Component({
  selector: 'app-card-check-in-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent,
    BaseCustomerSearchComponent
  ],
  templateUrl: './card-check-in-edit.component.html',
  styleUrl: './card-check-in-edit.component.scss'
})
export class CardCheckInEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  
  title: string[] = ['Thông tin check in', 'Information card'];

  modalMode: boolean = true;//for modal and style modal
  isAlertnoti: boolean = true;//for notification additional
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!: any[];
  subscriptions: Subscription[] = [];

  apiParams: string[] = ["TYPE_CARD"];

  formLabel: any = {};

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
  ) {
    super(dialogService);
    this.form = this.fb.group({
      id: [],
      cardCode: [null, [Validators.required]],
    })
    this.crud = {
      c: api.CARD_CHECK_IN_CHECK_IN,
      r: api.CARD_CHECK_IN_READ,
      u: api.CARD_CHECK_IN_CHECK_IN,
      d: api.CARD_CHECK_IN_DELETE_IDS,
    }

    this.formLabel = {
      code: !!this.language ? 'Mã thẻ' : 'Card Code',
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

}
