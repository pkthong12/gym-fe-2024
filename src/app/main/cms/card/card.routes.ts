import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "card-check-in",
    loadChildren:() => import('./card-check-in/card-check-in.routes').then((m) => m.routes)
  },
  {
    path: "card-info",
    loadChildren:() => import('./card-info/card-info.routes').then((m) => m.routes)
  },
  {
    path: "card-issuance",
    loadChildren:() => import('./card-issuance/card-issuance.routes').then((m) => m.routes)
  },
  {
    path: "card-history",
    loadComponent:() => import('./card-history/card-history.component').then((m) => m.CardHistoryComponent)
  },
];