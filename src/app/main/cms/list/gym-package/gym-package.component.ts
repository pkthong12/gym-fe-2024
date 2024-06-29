import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem, IInOperator } from '../../../../libraries/base-page-list/base-page-list.component';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-gym-package',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './gym-package.component.html',
  styleUrl: './gym-package.component.scss'
})
export class GymPackageComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GYM_PACKAGE_QUERY_LIST,
    deleteIds:api.GYM_PACKAGE_DELETE_IDS
  };
  title: string[] = ['Danh mục gói tập', 'List Gym Package'];
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
      field: 'status',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Mã gói', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Giá', 'Money'],
      field: 'money',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Thời hạn', 'Period'],
      field: 'period',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Ca tập', 'Shift'],
      field: 'shiftName',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Gói tập riêng', 'Private Package'],
      field: 'isPrivate',
      type: 'text',
      align: 'left',
      width: 400
    },
    {
      caption: ['Mô tả', 'Description'],
      field: 'description',
      type: 'text',
      align: 'left',
      width: 400
    },
  ]
  
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
