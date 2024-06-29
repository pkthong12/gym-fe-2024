import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';

import { HttpResponse } from '@angular/common/http';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-order-bills',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective,
  ],
  templateUrl: './order-bills.component.html',
  styleUrl: './order-bills.component.scss'
})
export class OrderBillsComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.ORD_BILL_QUERY_LIST,
  };
  title: string[] = ['Hóa Đơn', 'Bill'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  ids:number[] = [];
  showButtons: EnumBaseButton[] = [
    EnumBaseButton.PRINT,
    EnumBaseButton.VIEW,
    
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
      caption: ['Đã xác nhận', 'Confirm?'],
      field: 'isConfirm',
      type: 'bool',
      align: 'left',
      width: 150
    },
    {
      caption: ['Mã hóa đơn', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 160
    },
    {
      caption: ['Loại giao dịch', 'Type Transfer Name'],
      field: 'typeTransferName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Khách hàng', 'Customer Name'],
      field: 'customerName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Người bán hàng', 'Seller Name'],
      field: 'perSellName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày tạo', 'Created Date'],
      field: 'createdDate',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Tổng số tiền', 'Total Money'],
      field: 'totalMoney',
      type: 'currency',
      align: 'left',
      width: 120
    },
    {
      caption: ['% giảm giá', 'Discount Percent'],
      field: 'discPercent',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['% VAT', '% VAT'],
      field: 'PercentVat',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Số tiền phải trả', 'Money Have Pay'],
      field: 'moneyHavePay',
      type: 'currency',
      align: 'left',
      width: 190
    },
    {
      caption: ['Phương thức thanh toán', 'Pay Method Name'],
      field: 'payMethodName',
      type: 'text',
      align: 'left',
      width: 180
    },
  ]
  constructor(private httpService: HttpRequestService){

  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  buttonHeaderClick(e: any): void {
    if(e == EnumBaseButton.PRINT){
      this.subscriptions.push(
        this.httpService.makeDownloadRequest('print',api.ORD_BILL_PRINT,{ids:this.ids}).subscribe((x: HttpResponse<Blob>) => {
          const body = x.body;
          if (body?.type === 'application/pdf') {
            const downloadUrl = URL.createObjectURL(body);
            let binaryData = [];
            binaryData.push(body);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(
              new Blob(binaryData, { type: "blob" }));
            link.setAttribute('download', this.title[0]+'.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
          }
          else {
            const reader = new FileReader();
            reader.onload = () => {
              const jsonBody = reader.result as string;
              const data = JSON.parse(jsonBody);
              if (data.statusCode == 200) {
                //this.alertService.success(data.messageCode);
              }
              else {
                //this.alertService.error(data.messageCode);
              }
            };
            // reader.readAsText(x);
          }
        })
      )
    }
  }
  onSelected(e:any): void {
    this.ids = e
  }

}
