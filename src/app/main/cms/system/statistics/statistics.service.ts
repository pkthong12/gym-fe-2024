import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../constants/api/apiDefinitions';
import { HttpRequestService } from '../../../../services/http.service';

@Injectable()
export class StatisticsService {
    constructor(
        private httpService: HttpRequestService,
    ) { }
    getStats(month?: number, year: number = new Date().getFullYear()): Observable<any> {
        return this.httpService.makePostRequest('getListType', api.STATISTIC_GET_STAT, { month: month?.toString(), year: year.toString() });
    }

    getBarChart(type: number, month?: number, year: number = new Date().getFullYear()): Observable<any> {
        return this.httpService.makePostRequest('getListType', api.STATISTIC_GET_BAR_CHART, { type: type, month: month?.toString(), year: year.toString() });
    }
}