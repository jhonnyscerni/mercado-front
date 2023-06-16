import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'app/core/services/crud-service';
import { CategoryProduct } from 'app/models/category-product';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class CategoryProductService  extends CrudService<CategoryProduct>{
    constructor(protected http: HttpClient) {
        super(http, `${environment.urlbase}/mercado/categoriaprodutos`);
      }
}
