import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../../constants/api/apiDefinitions';
import { FormsModule } from '@angular/forms';
import { BasePageListService } from '../../../../libraries/base-page-list/base-page-list.service';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { AlertService } from '../../../../libraries/alert/alert.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-per-customer-list-card',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
  ],
  templateUrl: './per-customer-list-card.component.html',
  styleUrl: './per-customer-list-card.component.scss'
})
export class PerCustomerListCardComponent {
  title: string[] = ['Danh sách các thẻ được cấp', 'List of issued cards'];
  otherListTypeOptions!:any[];
  otherListTypeOptionShow!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  subscriptions: Subscription[] = [];
  currentIdType!:any;
  currentCodeType!:any;
  currentName!:any;
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_ISSUANCE_QUERY_LIST,
  };

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
      caption: ['Đã hết hạn?', 'Expired?'],
      field: 'isExpired',
      type: 'bool',
      align: 'left',
      width: 150
    },
    {
      caption: ['Số thẻ', 'Card number'],
      field: 'cardCode',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Loại thẻ', 'Card type'],
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
      caption: ['Ngày hết hạn', 'Expire date'],
      field: 'endDate',
      type: 'date',
      align: 'left',
      width: 200
    },
    {
      caption: ['Thời gian gia hạn', 'EXTENSION PERIOD'],
      field: 'idNo',
      type: 'date',
      align: 'center',
      width: 150
    },
    {
      caption: ['Tổng thời gian', 'TOTAL TIME'],
      field: 'totalHourCard',
      type: 'text',
      align: 'left',
      width: 140
    },
    {
      caption: ['Giá tiền', 'CARD PRICE'],
      field: 'moneyHavePay',
      type: 'currency',
      align: 'left',
      width: 150
    },
  ]

  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService,
    private basePageListService: BasePageListService,
    private alertService: AlertService,
  ){
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.getListOtherListTypes();
    })
  }
  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.PER_CUSTOMER_GET_ALL).subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.otherListTypeOptions = data;
            this.otherListTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.otherListTypeOptionShow = this.otherListTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.otherListTypeOptionShow = this.otherListTypeOptions
    }
  }
  onSelectedListTypeChanged(e:any) {
    console.log(e);
    if(this.currentIdType == e.id) return;
    else{
      this.currentName = e.name;
      this.currentIdType = e.id;
      this.currentCodeType = e.code;
      this.outerInOperators= [
        {
          field: 'customerId',
          values: e.id
        }
      ]
    }
  }
}
