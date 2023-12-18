import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private url: string = `${environment.urlbase}/mercado/dashboard`;
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(protected http: HttpClient) {
    }

    countUserPerson(params): Observable<any> {
        return this.http.get<any>(this.url + "/countPersonPhysical", {params});
    }

    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

       /**
     * Get data
     */
       getData(): Observable<any>
       {
           return this.http.get('api/dashboards/project').pipe(
               tap((response: any) =>
               {
                   this._data.next(response);
               }),
           );
       }
}
