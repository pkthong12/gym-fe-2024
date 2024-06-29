import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../../../../services/http.service';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-sys-user',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './sys-user.component.html',
  styleUrl: './sys-user.component.css'
})
export class SysUserComponent implements BaseComponent {
  
  subscriptions: Subscription[] = [];

  currentUserGroupType!:any;
  userGroupTypeOptions!:any[];
  userGroupTypeOptionShow!:any[];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_USER_QUERY_LIST,
    deleteIds:api.SYS_USER_DELETE_IDS
  };
  title: string[] = ['Tài khoản', 'User'];
  currentIdType!:any;
  otherListTypeOptions!:any[];
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
      caption: ['Tài khoản', 'Username'],
      field: 'username',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Ảnh đại diện', 'Avatar'],
      field: 'avatar',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Mã NV', 'Employee Code'],
      field: 'employeeCode',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Nhóm tài khoản', 'Account Group'],
      field: 'groupName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Họ và tên', 'Fullname'],
      field: 'fullname',
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

  getListUserGroup() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('',api.SYS_OTHER_LIST_GET_LIST_BY_GROUP  + 'USER_GROUP').subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.userGroupTypeOptions = data;
            this.userGroupTypeOptionShow = data;
          }
        }
      })
    );
  }

  onSearchUserGroupType(e:any){
    if(this.searchType !== '' && this.searchType !== null){
      this.userGroupTypeOptionShow = this.userGroupTypeOptions.filter(x=> x.name.toString().toUpperCase().includes(this.searchType.toString().toUpperCase()));
    }else{
      this.userGroupTypeOptionShow = this.userGroupTypeOptions
    }
  }

  onSelectedUserGroupTypeChanged(e:any) {
    console.log("onSelectedUserGroupTypeChanged", e);
    if(this.currentUserGroupType == e.id) return;
    else{
      this.currentUserGroupType = e.id;
      this.outerInOperators= [
        {
          field: 'groupId',
          values: e.id
        }
      ]
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListUserGroup();
    })
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
