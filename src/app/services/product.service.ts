import { UrlTree } from '@angular/router';
import { Page } from '../models/page/page';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../core/services/crud-service';
import { Observable, catchError } from 'rxjs';
import { Product } from 'app/models/product';


@Injectable({
    providedIn: 'root'
})
export class ProductService extends CrudService<Product> {
    private url: string = `${environment.urlbase}/mercado/produtos`;

    constructor(protected http: HttpClient) {
        super(http, `${environment.urlbase}/mercado/produtos`);
    }

    listSearchPage(params): Observable<Page<Product>> {
        return this.http.get<Page<Product>>(this.url, { params })
            .pipe(
                catchError(super.serviceError));
    }
}
