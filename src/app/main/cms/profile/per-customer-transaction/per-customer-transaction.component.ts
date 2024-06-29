import { Component } from '@angular/core';
import { BasePageListComponent, ICorePageListApiDefinition, ICoreTableColumnItem } from '../../../../libraries/base-page-list/base-page-list.component';
import { api } from '../../../../constants/api/apiDefinitions';
import { AppLayoutService } from '../../../../layout/applayout/applayout.service';
import { HttpRequestService } from '../../../../services/http.service';
import { EnumBaseButton } from '../../../../constants/headerButton/ButtonDefinitions';

@Component({
  selector: 'app-per-customer-transaction',
  standalone: true,
  imports: [
    BasePageListComponent
  ],
  templateUrl: './per-customer-transaction.component.html',
  styleUrl: './per-customer-transaction.component.scss'
})
export class PerCustomerTransactionComponent {
  title: string[] = ['Giao dịch với khách hàng', 'Transactions with customers'];

  apiQueryList: ICorePageListApiDefinition = {
    queryListRelativePath: api.PER_CUSTOMER_TRANSACTIONS_QUERY_LIST,
  };

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
      caption: ['Mã giao dịch', 'Transaction code'],
      field: 'code',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày giao dịch', 'Transaction date'],
      field: 'transDateString',
      type: 'text',
      align: 'left',
      width: 150
    },
    {
      caption: ['Mã khách hàng', 'Customer code'],
      field: 'customerCode',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Tên khách hàng', 'Customer name'],
      field: 'fullName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Nhóm khách hàng', 'Customer group'],
      field: 'customerClassName',
      type: 'text',
      align: 'left',
      width: 200
    },
    {
      caption: ['Ngày sinh', 'Birth date'],
      field: 'birthDateString',
      type: 'date',
      align: 'center',
      width: 120
    },
    {
      caption: ['CCCD/CMND', 'ID No'],
      field: 'idNo',
      type: 'text',
      align: 'center',
      width: 120
    },
    {
      caption: ['Giới tính', 'Gender'],
      field: 'genderName',
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Địa chỉ', 'Address'],
      field: 'address',
      type: 'text',
      align: 'left',
      width: 250
    },
    {
      caption: ['Điện thoại', 'Phone'],
      field: 'phoneNumber',
      type: 'text',
      align: 'left',
      width: 100
    },
    {
      caption: ['Hình thức liên hệ (Hình thức giao dịch)', 'Contact form (Transaction form)'],
      field: 'transForm',
      type: 'text',
      align: 'left',
      width: 200
    },
  ]
  constructor(
    public appLayoutService:AppLayoutService
  ) {
  }
}
