import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'base-tabs',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
  ],
  templateUrl: './base-tabs.component.html',
  styleUrl: './base-tabs.component.scss'
})
export class BaseTabsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title!: string[];
  @Input() headers!: string[];
  @Input() contents!: TemplateRef<any>[] | null;
  @Output() onChangeTab= new EventEmitter();

  contentShow!: TemplateRef<any>[]
  tabIndex: number = 0;
  language!: boolean;

  constructor(
    public appConfig: AppConfigService,
  ) {
    this.language = this.appConfig.LANGUAGE;
    console.log(this.contents)
  }
  ngOnInit(): void {
    if(!!this.contents && this.contents.length > 0) {
      this.contentShow = this.contents;
    }
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
  }
  
  onHandleChangeTab(e:any){
    if(e != this.tabIndex){
      this.tabIndex = e;
      this.onChangeTab.emit(true);
    }
  }
}
