import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../../../../services/dialog.service';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { api } from '../../../../../constants/api/apiDefinitions';

@Component({
  selector: 'app-sys-other-list-type-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    BasePageEditComponent
  ],
  templateUrl: './sys-other-list-type-edit.component.html',
  styleUrl: './sys-other-list-type-edit.component.scss'
})
export class SysOtherListTypeEditComponent extends BaseEditComponent {
  title: string[] = ['Nhóm tham số hệ thống','System parameter group'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    ) {
    super(dialogService);
    this.form = this.fb.group({
      id:[],
      code: [null,[Validators.required]],
      name: [null,[Validators.required]],
      note: [],
    })
    this.crud = {
      c: api.SYS_OTHER_LIST_TYPE_CREATE,
      r: api.SYS_OTHER_LIST_TYPE_READ,
      u: api.SYS_OTHER_LIST_TYPE_UPDATE,
      d: api.SYS_OTHER_LIST_TYPE_DELETE_IDS,
    }
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
