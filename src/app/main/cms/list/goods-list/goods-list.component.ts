import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { BasePageListComponent, ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-goods-list',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './goods-list.component.html',
  styleUrl: './goods-list.component.scss'
})
export class GoodsListComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GOODS_LIST_QUERY_LIST,
    deleteIds:api.GOODS_LIST_DELETE_IDS
  };
  title: string[] = ['Quản lý hàng hóa', 'Goods List'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];

  // LIST LEFT
  listGoodsTypeOptions!:any[];
  listGoodsTypeOptionShow!:any[];

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
      field: 'statusName',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Mã sản phẩm', 'Product Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên sản phẩm', 'Product Name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Loại sản phẩm', 'Product Type'],
      field: 'productTypeName',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Nhà cung cấp', 'Supplier'],
      field: 'supplier',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Giá nhập', 'Import Price'],
      field: 'importPrice',
      type: 'number',
      align: 'left',
      width: 250
    },
    {
      caption: ['Giá bán', 'Price'],
      field: 'price',
      type: 'number',
      align: 'left',
      width: 250
    },
    {
      caption: ['Số lượng tồn kho', 'Quantity'],
      field: 'quantity',
      type: 'number',
      align: 'left',
      width: 400
    },
    {
      caption: ['Đơn vị', 'Measure'],
      field: 'measureName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ngày nhập kho', 'Receiving Date'],
      field: 'receivingDate',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ngày hết hạn', 'Expire Date'],
      field: 'expireDate',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Người quản lý', 'ManagerName'],
      field: 'managerName',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]
  
  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService
  ){
  }

  getListGoodsTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'GOODS_LIST_TYPE').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.listGoodsTypeOptions = data;
            this.listGoodsTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.listGoodsTypeOptionShow = this.listGoodsTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.listGoodsTypeOptionShow = this.listGoodsTypeOptions
    }
  }

  onSelectedListTypeChanged(e:any) {
    console.log("onSelectedCardCodeChanged", e);
    if(this.currentIdType == e.id) return;
    else{
      this.currentIdType = e.id;
      this.outerInOperators= [
        {
          field: 'productTypeId',
          values: e.id
        }
      ]
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListGoodsTypes()
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
