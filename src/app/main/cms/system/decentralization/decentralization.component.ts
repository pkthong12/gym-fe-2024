import { Component } from '@angular/core';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem, BasePageListComponent } from '../../../../libraries/base-page-list/base-page-list.component';
import { HttpRequestService } from '../../../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';

@Component({
  selector: 'app-decentralization',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './decentralization.component.html',
  styleUrl: './decentralization.component.scss'
})
export class DecentralizationComponent implements BaseComponent {

  listSysOtherListType: any[]=[];
  subscriptions: Subscription[] = [];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHER_LIST_QUERY_LIST,
    deleteIds:api.SYS_OTHER_LIST_DELETE_IDS
  };
  title: string[] = ['Tham số hệ thống', 'System parameter'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
  otherListTypeOptionShow!:any[];
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
      field: 'status',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Mã nhóm', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Tên tham số', 'name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Mô tả', 'Description'],
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
  
  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_ALL_USER).subscribe(x => {
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

  ngOnInit(){
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.getListOtherListTypes();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
