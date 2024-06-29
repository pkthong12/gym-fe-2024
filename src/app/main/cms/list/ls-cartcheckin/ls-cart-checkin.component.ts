import { Component } from '@angular/core';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { Subscription } from 'rxjs';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../../constants/api/apiDefinitions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { AppConfigService } from '../../../../services/app-config.service';

@Component({
  selector: 'app-ls-cart-checkin',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective,
  ],
  templateUrl: './ls-cart-checkin.component.html',
  styleUrl: './ls-cart-checkin.component.scss'
})
export class LsCartCheckinComponent {
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.CARD_CHECK_IN_QUERY_LIST,
    deleteIds:api.CARD_CHECK_IN_DELETE_IDS
  };
  title: string[] = ['Danh sách thẻ check-in', 'List cart check-in'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  searchType!:any;
  outerInOperators: IInOperator[] = [];
  showButtons: EnumBaseButton[] = [EnumBaseButton.CREATE, EnumBaseButton.DELETE, EnumBaseButton.EDIT, EnumBaseButton.APPROVE]
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
      caption: ['Mã khách hàng', 'Code customer'],
      field: 'codeCus',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên khách hàng', 'Customer name'],
      field: 'customerName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Giới tính', 'Gender'],
      field: 'genderName',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Tên type thẻ', 'Card type name'],
      field: 'cardTypeName',
      type: 'text',
      align: 'left',
      width: 170
    },
    {
      caption: ['Giờ vào', 'Time start'],
      field: 'timeStartString',
      type: 'text',
      align: 'left',
      width: 130
    },
    
    {
      caption: ['Giờ ra', 'Time end'],
      field: 'timeEndString',
      type: 'text',
      align: 'left',
      width: 130
    },
  ]
  language!: boolean;
  constructor(
    private httpService: HttpRequestService,
    public appLayoutService:AppLayoutService,
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
