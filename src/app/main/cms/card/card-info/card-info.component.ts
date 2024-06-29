import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_INFO_QUERY_LIST,
    deleteIds:api.CARD_INFO_DELETE_IDS,
    toggleActiveIds: api.CARD_INFO_TOGGLE_ACTIVE
  };
  title: string[] = ['Thông tin thẻ', 'Card Information'];
  searchType!:any;
  currentTypeId!:any;

  outerInOperators: IInOperator[] = [];

  subscriptions: Subscription[]=[];

  listCardTypeOptions!:any[];
  listCardTypeOptionShow!:any[];

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
      width: 220
    },
    {
      caption: ['Mã thẻ', 'Card code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Tên loại thẻ', 'Card type name'],
      field: 'cardTypeName',
      type: 'text',
      align: 'left',
      width: 170
    },
    {
      caption: ['Ngày hiệu lực', 'Effect Date'],
      field: 'effectDateString',
      type: 'date',
      align: 'left',
      width: 150
    },
    {
      caption: ['Ngày hết hạn', 'Expired Date'],
      field: 'expiredDateString',
      type: 'date',
      align: 'left',
      width: 150
    },
    {
      caption: ['Có tủ đồ', 'Wardrobe?'],
      field: 'wardrobe',
      type: 'bool',
      align: 'left',
      width: 120
    },
    {
      caption: ['Có PT', 'Have PT?'],
      field: 'isHavePt',
      type: 'bool',
      align: 'left',
      width: 120
    },
    {
      caption: ['Giá', 'Price'],
      field: 'price',
      type: 'currency',
      align: 'left',
      width: 150
    },
    {
      caption: ['Ca tập', 'Shift Name'],
      field: 'shiftName',
      type: 'text',
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
  ) {
  }

  getListCodeCards() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_GROUP  + 'TYPE_CARD').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.listCardTypeOptions = data;
            this.listCardTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchCardType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.listCardTypeOptionShow = this.listCardTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.listCardTypeOptionShow = this.listCardTypeOptions
    }
  }

  onSelectedCardTypeChanged(e:any) {
    console.log("onSelectedCardTypeChanged", e);
    if(this.currentTypeId == e.id) return;
    else{
      this.currentTypeId = e.id;
      this.outerInOperators= [
        {
          field: 'cardTypeId',
          values: e.id
        }
      ]
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListCodeCards();
    })
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
  }
}
