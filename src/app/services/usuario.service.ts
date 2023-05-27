import { Page } from '../models/page/page';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../core/services/crud-service';
import { Observable, catchError } from 'rxjs';
import { User } from 'app/models/user';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends CrudService<User> {
    private url: string = `${environment.urlbase}/mercado/usuarios`;

    constructor(protected http: HttpClient) {
        super(http, `${environment.urlbase}/mercado/usuarios`);
    }

    listSearchPage(params): Observable<Page<User>> {
        //console.log(params)
        return this.http.get<Page<User>>(this.url, { params })
            .pipe(
                catchError(super.serviceError));
    }
}
