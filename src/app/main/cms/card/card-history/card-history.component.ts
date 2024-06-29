import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-card-history',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './card-history.component.html',
  styleUrl: './card-history.component.scss'
})
export class CardHistoryComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_HISTORY_QUERY_LIST,
    deleteIds:api.CARD_HISTORY_DELETE_IDS,
    toggleActiveIds: api.CARD_HISTORY_TOGGLE_ACTIVE
  };
  title: string[] = ['Lịch sử thẻ', 'Card History'];
  currentCode!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];

  cardCodeOptions!:any[];
  cardCodeOptionShow!:any[];

  showButtons: EnumBaseButton[] = [
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
      caption: ['Mã thẻ', 'Card code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Thao tác', 'Action'],
      field: 'actionStr',
      type: 'text',
      align: 'left',
      width: 220
    },
    {
      caption: ['Thời gian chỉnh sửa', 'Modify Date'],
      field: 'createdDateStr',
      type: 'text',
      align: 'left',
      width: 220
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
  subscriptions: Subscription[]=[];

  getListCodeCards() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.CARD_HISTORY_GET_LIST_CARD_CODE).subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.cardCodeOptions = data;
            this.cardCodeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchCardCode(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.cardCodeOptionShow = this.cardCodeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.cardCodeOptionShow = this.cardCodeOptions
    }
  }

  onSelectedCardCodeChanged(e:any) {
    console.log("onSelectedCardCodeChanged", e);
    if(this.currentCode == e.code) return;
    else{
      this.currentCode = e.code;
      this.outerInOperators= [
        {
          field: 'code',
          values: e.code
        }
      ]
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListCodeCards();
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  
}
