import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../../../../services/http.service';
import { api } from '../../../../constants/api/apiDefinitions';

@Injectable({
    providedIn: 'root'
})
  
export class SysOtherListService {
    constructor(
        private httpService: HttpRequestService,
    ) { }
    getListType(): Observable<any> {
        return this.httpService.makeGetRequest('getListType',api.SYS_OTHER_LIST_TYPE_GET_LIST)
    }
}