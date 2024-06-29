import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, filter, debounceTime, map } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { IAuthData } from '../../../../interfaces/IAuthData';
import { IFormatedResponse } from '../../../../interfaces/IFormatedResponse';
import { IAlertOptions } from '../../../../libraries/alert/alert.component';
import { AlertService } from '../../../../libraries/alert/alert.service';
import { BaseComponent } from '../../../../libraries/base-component/base-component.component';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTabsComponent } from '../../../../libraries/base-tabs/base-tabs.component';
import { HttpRequestService } from '../../../../services/http.service';
export interface ILocalDataItem {
  status?: string;
  offRegistered?: boolean;
  codeLoc: string;
}

export interface ILocalDataRow {
  items: ILocalDataItem[];
  mixed: boolean;
}


@Component({
  selector: 'app-locker-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseTabsComponent
  ],
  templateUrl: './locker-status.component.html',
  styleUrl: './locker-status.component.scss'
})
export class LockerStatusComponent extends BaseComponent implements OnInit, AfterViewInit {
  title: string[]=['Trạng thái tủ','Locker status'];

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private httpService: HttpRequestService,
  ) {
    super();
  }
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 3000,
  };
  data$ = new BehaviorSubject<ILocalDataRow[]>([]);
  
  cellHeight: number = 120;
  monthPickerActive: boolean = false;
  yearPickerActive: boolean = false;
  resizeStream$!: Observable<any>;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  @ViewChild('calendarBody') calendarBody!: ElementRef;
  genderId:number = 8;
  override ngOnInit(): void {
    this.resizeStream$ = fromEvent(window, 'resize');
  }

  private setCss(): void {
    const rect = this.calendarContainer.nativeElement.getBoundingClientRect();
    const cellWidth = (rect.width - 6 * 70) / 7;
    this.container.nativeElement.style.setProperty('--calendar-width', rect.width + 'px');
    this.container.nativeElement.style.setProperty('--spot-height', cellWidth + 'px');
    this.container.nativeElement.style.setProperty('--spot-width', cellWidth + 'px');
  }

  override ngAfterViewInit(): void {
    setTimeout(() => {
      this.httpService
      .makeGetRequest('','/api/GoodsLocker/GetLockerStatus?area='+this.genderId)
      .subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            this.data$.next(body.innerBody.list);
          }
        }
      });
    })
    this.setCssChangeTab();
  }
  setCssChangeTab(){
    const rect = this.calendarContainer.nativeElement.getBoundingClientRect();
    const cellWidth = (rect.width - 6 * 70) / 7;
    console.log(cellWidth)
    const cellHeight = cellWidth;
    this.data$.pipe(filter((x) => !!x.length)).subscribe((x) => {
      setTimeout(() => {
        this.container.nativeElement.style.setProperty('--spot-height', cellWidth + 'px');
        this.container.nativeElement.style.setProperty('--calendar-width', rect.width + 'px');
        this.container.nativeElement.style.setProperty('--calendar-body-height', x.length * cellHeight + 'px');
        const el = this.calendarBody.nativeElement;
        el.classList.remove('fade-in');
        el.offsetWidth;
        el.classList.add('fade-in');
        this.setCss();
      });
    });

    setTimeout(() => {
      this.setCss();
      this.subscriptions.push(
        this.resizeStream$.pipe(debounceTime(100)).subscribe((x) => {
          this.setCss();
        }),
      );
    });
  }
  onChangeTab(e:any){
    if(this.genderId == 8) this.genderId = 9;
    else this.genderId = 8;
    setTimeout(() => {
      this.httpService
      .makeGetRequest('','/api/GoodsLocker/GetLockerStatus?area='+this.genderId)
      .subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            this.data$.next(body.innerBody.list);
          }
        }
      });
    })
  }
}