import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasePageEditComponent, ICorePageEditCRUD } from '../../../../../libraries/base-page-edit/base-page-edit.component';
import { BaseEditComponent } from '../../../../../libraries/base-edit/base-edit.component';
import { DialogService } from '../../../../../services/dialog.service';
import { api } from '../../../../../constants/api/apiDefinitions';
import { HttpRequestService } from '../../../../../services/http.service';
import { Subscription } from 'rxjs';
import { DropdownComponent } from '../../../../../libraries/base-dropdown/dropdown.component';

@Component({
  selector: 'app-sys-other-list-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BasePageEditComponent,
    DropdownComponent
  ],
  templateUrl: './sys-other-list-edit.component.html',
  styleUrl: './sys-other-list-edit.component.scss'
})
export class SysOtherListEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = ['Nhóm tham số hệ thống', 'System parameter group'];

  modalMode: boolean = true;//for modal and style modal
  crud!: ICorePageEditCRUD;

  otherListTypeOptions!: any[];
  subscriptions: Subscription[] = [];

  getListTypeOptions$: api = api.SYS_OTHER_LIST_TYPE_GET_LIST;

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private httpService: HttpRequestService,
  ) {
    super(dialogService);
    this.form = this.fb.group({
      id: [],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      note: [],
    })
    this.crud = {
      c: api.SYS_OTHER_LIST_CREATE,
      r: api.SYS_OTHER_LIST_READ,
      u: api.SYS_OTHER_LIST_UPDATE,
      d: api.SYS_OTHER_LIST_DELETE_IDS,
    }
  }


  getListOtherListTypes() {
    this.subscriptions.push(
      this.httpService.makeGetRequest('', api.SYS_OTHER_LIST_TYPE_GET_LIST).subscribe(x => {
        if (!!x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            const data = body.innerBody;
            this.otherListTypeOptions = data;
          }
        }
      })
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getListOtherListTypes();
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  onDropdownSelected(event:any, e:string):void{
    this.form.get(e)?.setValue(event);
    this.form.get(e)?.markAllAsTouched();
  }
}
