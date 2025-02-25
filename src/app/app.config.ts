import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch())]//, provideClientHydration() cmt tạm thời tránh lỗi
};


// export const baseUrl: string = 'https://localhost:44360/api';
export const baseUrl: string = 'https://cuzem3-001-site1.mtempurl.com'; // BUILD PRODUCT WITH THIS API
export const language: boolean = false; // true - english, false - vietnamese

