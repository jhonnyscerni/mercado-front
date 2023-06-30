import { UrlTree } from '@angular/router';
import { Page } from '../models/page/page';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../core/services/crud-service';
import { Observable, catchError } from 'rxjs';
import { Notice } from 'app/models/notice';


@Injectable({
    providedIn: 'root'
})
export class NoticeService extends CrudService<Notice> {
    private url: string = `${environment.urlbase}/mercado/editais`;

    constructor(protected http: HttpClient) {
        super(http, `${environment.urlbase}/mercado/editais`);
    }

    listSearchPage(params): Observable<Page<Notice>> {
        return this.http.get<Page<Notice>>(this.url, { params })
            .pipe(
                catchError(super.serviceError));
    }
}
