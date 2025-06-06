import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../../services/http.service';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',

})
export class DropdownComponent implements BaseComponent, OnChanges {
  @Input() apiGetOptions!: string;
  @Input() getByIdOptions!: any;
  @Input() disableSelect: boolean = false;
  @Input() canClearValue: boolean = true;

  @Output() valueChange = new EventEmitter;
  subscriptions: Subscription[] = [];
  data: any[] = [];
  @Input() dataShow: any[] = [];
  /**
   *
   */
  selected: boolean = false;
  selectedId!: any;
  constructor(
    private httpService: HttpRequestService,
  ) {
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getByIdOptions']) {
      this.selectedId = changes['getByIdOptions'].currentValue;
    }
    if (changes['apiGetOptions']) {
      if (!changes['apiGetOptions'].firstChange) {
        this.CallData();
      }
    }
  }
  ngAfterViewInit(): void {
    this.CallData();
  }
  CallData() {
    setTimeout(() => {
      if (!!this.apiGetOptions && this.apiGetOptions !== '') {
        this.subscriptions.push(
          this.httpService.makeGetRequest('get', this.apiGetOptions).pipe().subscribe((x) => {
            if (!!x.ok && x.status == '200') {
              const body = x.body;
              if (body.statusCode == '200') {
                const data = body.innerBody;
                this.data = data;
                this.dataShow = data;
              }
            }
          })
        )
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe())
  }
  onSelectedIds(e: any) {
    this.selectedId = e.id;
    this.valueChange.emit(this.selectedId)
  }
  onUnselectedIds() {
    this.selectedId = null;
    this.valueChange.emit(this.selectedId)
  }
  blur() {
    console.log('first')
  }
}
