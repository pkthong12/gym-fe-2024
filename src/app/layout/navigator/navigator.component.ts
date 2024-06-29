import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../../libraries/tooltip/tooltip.module';
import { AppConfigService } from '../../services/app-config.service';

declare var Zenix: any;
@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TooltipModule,
    FormsModule,
  ],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.scss'
})
export class NavigatorComponent implements AfterViewInit {
  data:any[]=[];
  language!: boolean;
  constructor(
    private authService: AuthService,
    public appConfig: AppConfigService,

  ){
    this.language = this.appConfig.LANGUAGE;
  }
  ngAfterViewInit(): void {
    Zenix.init();
  }
  ngOnInit() {
    this.data = this.authService.data$.value?.decentralization;
  }
}
