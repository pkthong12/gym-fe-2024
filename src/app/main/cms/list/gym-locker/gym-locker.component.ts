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
  selector: 'app-gym-locker',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './gym-locker.component.html',
  styleUrl: './gym-locker.component.scss'
})
export class GymLockerComponent {

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GOODS_LOCKER_QUERY_LIST,
    deleteIds:api.GOODS_LOCKER_DELETE_IDS,
    toggleActiveIds: api.GOODS_LOCKER_TOGGLE_ACTIVE
  };
  title: string[] = ['Danh sách tủ', 'Wardrobe list'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];
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
      width: 220
    },
    {
      caption: ['Mã tủ', 'Wardrobe code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Khu vực', 'Area'],
      field: 'areaName',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Giá thuê/ tiếng', 'Rental price/hour'],
      field: 'price',
      type: 'currency',
      align: 'left',
      width: 150
    },
    {
      caption: ['Bảo trì từ ngày', 'Maintenance from date'],
      field: 'date',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Bảo trì đến ngày', 'Maintenance up to date'],
      field: 'date',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 220
    },
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
