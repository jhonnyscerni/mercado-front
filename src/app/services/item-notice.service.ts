import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'app/core/services/crud-service';
import { NoticeItem } from 'app/models/notice-item';
import { environment } from 'environments/environment';
import { Observable, map, catchError } from 'rxjs';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ItemNoticeService extends CrudService<NoticeItem>  {

  
  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/mercado/item-edital`);
  }


  private url: string = `${environment.urlbase}/mercado/editais`;

  public saveItemEdital(id: any, itemEdital: NoticeItem,): Observable<any> {
    console.log(itemEdital)
    return this.http
        .post(this.url +'/' + id + '/item',
        itemEdital, {headers})
        .pipe(
            catchError(super.serviceError));
  }

}
