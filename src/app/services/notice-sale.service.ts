import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'app/core/services/base.service';
import { Sale } from 'app/models/sale';
import { environment } from 'environments/environment';
import { Observable, catchError } from 'rxjs';
import { Page } from '../models/page/page';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class NoticeSaleService extends BaseService {

private url: string = `${environment.urlbase}/mercado/editais`;

constructor(private http: HttpClient) {
  super();
}


public savarLeilao(sale: Sale, id: any): Observable<any> {
  console.log(sale)
  return this.http
      .post(this.url +'/' + id + '/leilao',
      sale, {headers})
      .pipe(
          catchError(super.serviceError));
}

  listSearchPage(id: any, params): Observable<Page<Sale>> {
    return this.http.get<Page<Sale>>(this.url + "/"+ id +"/leilao", { params });
  }

}
