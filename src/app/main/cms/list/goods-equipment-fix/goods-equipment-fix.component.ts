import { Component } from '@angular/core';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { Subscription } from 'rxjs';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { api } from '../../../../constants/api/apiDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { HttpRequestService } from '../../../../services/http.service';

@Component({
  selector: 'app-goods-equipment-fix',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './goods-equipment-fix.component.html',
  styleUrl: './goods-equipment-fix.component.css'
})
export class GoodsEquipmentFixComponent implements BaseComponent{
  subscriptions: Subscription[] = [];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GOODS_EQUIPMENT_FIX_QUERY_LIST,
    deleteIds:api.GOODS_EQUIPMENT_FIX_DELETE_IDS
  }; 
  
  title: string[] = ['Danh sách bảo trì/sửa chữa thiết bị', 'List Equipment Fix'];
  currentIdType!:any;
  searchType!:any;
  outerInOperators: IInOperator[] = [];

  // LIST LEFT
  listEquipmentTypeOptions!:any[];
  listEquipmentTypeOptionShow!:any[];

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
      caption: ['Trạng thái sau bảo trì/sửa chữa', 'Status'],
      field: 'result',
      type: 'text',
      align: 'left',
      width: 300
    },
    {
      caption: ['Mã bảo trì/sửa chữa', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên thiết bị', 'Name'],
      field: 'equipmentName',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Loại thiết bị', 'Equipment Type'],
      field: 'typeName',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Ngày thực hiện', 'Start Date'],
      field: 'startDate',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Ngày hoàn thành', 'End Date'],
      field: 'endDate',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
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

  getListEquipmentTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_CODE + 'EQUIPMENT_TYPE').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.listEquipmentTypeOptions = data;
            this.listEquipmentTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchListType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.listEquipmentTypeOptionShow = this.listEquipmentTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.listEquipmentTypeOptionShow = this.listEquipmentTypeOptions
    }
  }

  onSelectedListTypeChanged(e:any) {
    console.log("onSelectedCardCodeChanged", e);
    if(this.currentIdType == e.id) return;
    else{
      this.currentIdType = e.id;
      this.outerInOperators= [
        {
          field: 'typeId',
          values: e.id
        }
      ]
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListEquipmentTypes()
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
