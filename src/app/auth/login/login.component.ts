import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { AppConfigService } from '../../services/app-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../libraries/alert/alert.service';
import { IClientLoginRequest } from '../../interfaces/IClientLoginRequest';
import { IAuthData } from '../../interfaces/IAuthData';
import { IFormatedResponse } from '../../interfaces/IFormatedResponse';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../libraries/alert/alert.component';
import { PreLoaderComponent } from '../../layout/pre-loader/pre-loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,   
    AlertComponent, 
    PreLoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  form: FormGroup;
  passwordInputType: string = 'password';
  subscriptions: Subscription[] = [];
  showPassword: boolean = false;
  model: LoginInterface = new LoginInterface();
  language!: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public appConfigService: AppConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {

    this.language = this.appConfigService.LANGUAGE;

    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.subscriptions.push(
      this.authService
        .userLogin(this.form.getRawValue() as IClientLoginRequest)
        .subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            //this.responseService.resolve(body)
            if (body.statusCode === 200) {
              const newAuthData: IAuthData = {
                ...body.innerBody,
                loginTime: new Date().getTime(),
              };
              this.authService.data$.next(newAuthData);
              this.alertService.success('Login Successful');
              localStorage.setItem('gym_token', newAuthData.token);
              this.router.navigate(['/home']);
            } else {
              this.alertService.info(
                x.body.messageCode
              );
            }
          this.loading = false;
          } else {
            if (isDevMode()) {
            } else {
              this.alertService.info('Login failed');
            }
          this.loading = false;

          }
        })
    );    
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

  ngOnDestroy(): void {
  }

}
