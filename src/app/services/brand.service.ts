import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'app/core/services/crud-service';
import { Brand } from 'app/models/brand';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class BrandService extends CrudService<Brand>{
    constructor(protected http: HttpClient) {
        super(http, `${environment.urlbase}/mercado/marcaprodutos`);
      }
}
