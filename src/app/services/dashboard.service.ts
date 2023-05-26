import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private url: string = `${environment.urlbase}/mercado/dashboard`;

    constructor(protected http: HttpClient) {
    }

    countUserPerson(params): Observable<any> {
        return this.http.get<any>(this.url + "/countPersonPhysical", {params});
    }
}
