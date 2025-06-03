import { Routes } from '@angular/router';

export const CmsRoutes: Routes = [
    {
        path: 'system',
        loadChildren: () => import('./system/system.routes').then((m) => m.routes)
    },
    {
        path: 'card',
        loadChildren: () => import('./card/card.routes').then((m) => m.routes)
    },
    {
        path: 'list',
        loadChildren: () => import('./list/list.routes').then((m) => m.routes)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then((m) => m.routes)
    },
    {
        path: 'report',
        loadComponent: () => import('./system/report-list/report-list.component').then((m) => m.ReportListComponent)
    },
    {
        path: 'statistics',
        loadComponent: () => import('./system/statistics/statistics.component').then((m) => m.StatisticsComponent)
    },
    {
        path: "**",
        loadComponent: () => import("../error/error-404/error-404.component").then(m => m.Error404Component)
    },
];
