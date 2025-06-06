import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch())]//, provideClientHydration() cmt tạm thời tránh lỗi
};


export const baseUrl: string = 'https://localhost:44360/api';
// export const baseUrl: string = 'https://cuzemm3-001-site1.ntempurl.com/api'; // BUILD PRODUCT WITH THIS API
export const language: boolean = false; // true - english, false - vietnamese

