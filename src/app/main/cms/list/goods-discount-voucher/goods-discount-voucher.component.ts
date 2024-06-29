import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-goods-discount-voucher',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './goods-discount-voucher.component.html',
  styleUrl: './goods-discount-voucher.component.css'
})
export class GoodsDiscountVoucherComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GOODS_DISCOUNT_VOUCHER_QUERY_LIST,
    deleteIds:api.GOODS_DISCOUNT_VOUCHER_DELETE_IDS
  }; 

  title: string[] = ['Danh sách phiếu giảm giá', 'List Discount Voucher'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];

  // LIST LEFT
  listDiscountTypeOptions!:any[];
  listDiscountTypeOptionShow!:any[];

  showButtons: EnumBaseButton[] = [
    EnumBaseButton.CREATE, 
    EnumBaseButton.DELETE, 
    EnumBaseButton.EDIT, 
    EnumBaseButton.APPROVE
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
      caption: ['Trạng thái', 'Status'],
      field: 'status',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Mã phiếu giảm giá', 'Discount Voucher Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Tên phiếu giảm giá', 'Discount Voucher Name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Loại giảm giá', 'Equipment Discount'],
      field: 'discountTypeName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Giá trị giảm giá', 'Discount value'],
      field: 'dicountValue',
      type: 'text',
      align: 'left',
      width: 300
    },
    {
      caption: ['Ngày bắt đầu', 'Start Date'],
      field: 'startDate',
      type: 'date',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày kết thúc', 'End Date'],
      field: 'endDate',
      type: 'date',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số lượng phát hành', 'Issue quantity'],
      field: 'issueQuantity',
      type: 'number',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số lượng đã sử dụng', 'Quantity used'],
      field: 'usedQuantity',
      type: 'number',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
    },
  ]

  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ){
  }

  getListDiscountTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'DISCOUNT_TYPE').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.listDiscountTypeOptions = data;
            this.listDiscountTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.listDiscountTypeOptionShow = this.listDiscountTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.listDiscountTypeOptionShow = this.listDiscountTypeOptions
    }
  }

  onSelectedListTypeChanged(e:any) {
    console.log("onSelectedCardCodeChanged", e);
    if(this.currentIdType == e.id) return;
    else{
      this.currentIdType = e.id;
      this.outerInOperators= [
        {
          field: 'discountTypeId',
          values: e.id
        }
      ]
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListDiscountTypes()
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
