import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { BasePageListComponent, ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-card-issuance',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './card-issuance.component.html',
  styleUrl: './card-issuance.component.scss'
})
export class CardIssuanceComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_ISSUANCE_QUERY_LIST,
    deleteIds:api.CARD_ISSUANCE_DELETE_IDS,
    toggleActiveIds: api.CARD_ISSUANCE_TOGGLE_ACTIVE,
    exportExcel:api.CARD_ISSUANCE_QUERY_LIST,
  };
  title: string[] = ['Cấp thẻ', 'Card issuance'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  showButtons: EnumBaseButton[] = [
    EnumBaseButton.CREATE, 
    EnumBaseButton.DELETE, 
    EnumBaseButton.EDIT, 
    EnumBaseButton.APPROVE,
    EnumBaseButton.PDF,
    EnumBaseButton.EXCEL,
  ]
  columns: ICoreTableColumnItem[] = [
    {
      caption: ['id', 'id'],
      field: 'id',
      hidden: true,
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Số chứng từ', 'Document number'],
      field: 'documentNumber',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Ngày chứng từ', 'Customer code'],
      field: 'documentDate',
      type: 'date',
      align: 'left',
      width: 220
    },
    {
      caption: ['Tên khách hàng', 'Customer name'],
      field: 'customerName',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Mã khách hàng', 'Customer Code'],
      field: 'customerCode',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Khung giờ tập', 'Practice time'],
      field: 'practiceTime',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số thẻ', 'Card number'],
      field: 'cardCode',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Loại thẻ', 'Type card'],
      field: 'cardTypeName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày bắt đầu', 'Start date'],
      field: 'startDate',
      type: 'date',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày kết thúc ', 'End date'],
      field: 'endDate',
      type: 'date',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số giờ tập', 'Start date'],
      field: 'hourCard',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số giờ thêm', 'Extra time'],
      field: 'hourCardBonus',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Tổng giờ', 'Total time'],
      field: 'totalHourCard',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Giá thẻ', 'Price'],
      field: 'cardPrice',
      type: 'currency',
      align: 'left',
      width: 200
    },
    {
      caption: ['VAT', 'VAT'],
      field: 'percentVat',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Tổng cộng', 'Total'],
      field: 'totalPrice',
      type: 'currency',
      align: 'left',
      width: 200
    },
    {
      caption: ['Phần trăm giảm', 'Percent reduction'],
      field: 'percentDiscount',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền sau giảm giá', 'Reduced amount'],
      field: 'afterDiscount',
      type: 'currency',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền phải trả', 'The money have to pay'],
      field: 'moneyHavePay',
      type: 'currency',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số tiền đẫ trả', 'The money have to pay'],
      field: 'paidMoney',
      type: 'currency',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ghi chú', 'note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
    // {
    //   caption: ['Tạo bởi', 'Create by'],
    //   field: 'createdByUsername',
    //   type: 'text',
    //   align: 'left',
    //   width: 200
    // },
  ]
  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ) {
  }
  subscriptions: Subscription[]=[];
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
  }
}
