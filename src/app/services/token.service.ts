import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequestService } from './http.service';
import { api } from '../constants/api/apiDefinitions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isExpired$ = new BehaviorSubject<boolean>(true);

  constructor(
    private httpService: HttpRequestService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  saveToken(token: string, expiresIn: Date): void {
    this.storageService.setItem('gym_token', token);
    setTimeout(() => {
      this.removeToken();
    }, expiresIn.getTime() - new Date().getTime());
  }

  getToken(): string | null {
    return this.storageService.getItem('gym_token');
  }

  removeToken(): void {
    this.storageService.removeItem('gym_token');
    this.isExpired$.next(true);
  }

  getExpiration(): number {
    if (!this.getToken()) {
      this.isExpired$.next(true);
      return 0;
    }
    this.httpService.makePostRequest('Refresh', api.SYS_REFRESH, { token: this.getToken() }).subscribe(x => {
      if (x?.ok && x.status === '200') {
        const body = x.body;
        if (body.statusCode === 200) {
          const data = body.innerBody;
          if (data.isExpired) {
            this.removeToken();
            return 0;
          } else {
            this.saveToken(data.token, new Date(data.dateExpire));
            this.authService.data$.next(data);
            return data.expiresIn;
          }
        }
      }
    });
    return 0;
  }

  userLogout(): Observable<any> {
    const url = api.SYS_LOGOUT;
    this.authService.data$.next(null);
    this.removeToken();
    return this.httpService.makePostRequest('clientLogout', url, {});
  }
}