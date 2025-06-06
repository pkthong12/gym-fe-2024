import { Component, OnInit } from '@angular/core';
import { PreLoaderComponent } from '../pre-loader/pre-loader.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../auth/login/login.component';
import { DemoTableComponent } from '../../demo/demo-table/demo-table.component';
import { DemoFormComponent } from '../../demo/demo-form/demo-form.component';
import { RouterModule } from '@angular/router';
import { NavigatorComponent } from '../navigator/navigator.component';
import { ConfirmDialogComponent } from '../../libraries/confirm-dialog/confirm-dialog.component';
import { AppConfigService } from '../../services/app-config.service';
import { AlertComponent } from '../../libraries/alert/alert.component';
import { baseUrl,language } from '../../app.config';
@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [
    PreLoaderComponent,
    HeaderComponent,
    FooterComponent,
    DemoTableComponent,
    DemoFormComponent,
    RouterModule,
    NavigatorComponent,
    ConfirmDialogComponent,
    AlertComponent,
  ],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.css'
})
export class ApplayoutComponent implements OnInit {
  avatarUrl!: string;
  language!: boolean;
  constructor(public appConfig: AppConfigService, ) {
    this.language = this.appConfig.LANGUAGE;
  }
  ngOnInit(): void {
    this.appConfig.BASE_URL = baseUrl;
    this.appConfig.LANGUAGE = language;
  }

}
