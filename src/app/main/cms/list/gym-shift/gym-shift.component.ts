import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem, BasePageListComponent } from '../../../../libraries/base-page-list/base-page-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../../../../libraries/debounce-event/debounce-event.directive';

@Component({
  selector: 'app-gym-shift',
  standalone: true,
  imports: [
    CommonModule,
    BasePageListComponent,
    FormsModule,
    DebounceDirective
  ],
  templateUrl: './gym-shift.component.html',
  styleUrl: './gym-shift.component.scss'
})
export class GymShiftComponent implements BaseComponent {
  subscriptions: Subscription[] = [];
  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.GYM_SHIFT_QUERY_LIST,
    deleteIds:api.GYM_SHIFT_DELETE_IDS
  };
  title: string[] = ['Danh mục ca tập', 'List Gym Shift'];
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
      width: 200
    },
    {
      caption: ['Mã ca', 'Code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 160
    },
    {
      caption: ['Tên ca', 'Name'],
      field: 'name',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Số ngày trong tuần', 'Total Days Of Week'],
      field: 'totalDays',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Giờ bắt đầu', 'Hour Start'],
      field: 'hoursStartString',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Giờ kết thúc', 'Hour Start'],
      field: 'hoursEndString',
      type: 'text',
      align: 'left',
      width: 120
    },
    {
      caption: ['Ghi chú', 'Note'],
      field: 'note',
      type: 'text',
      align: 'left',
      width: 200
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
